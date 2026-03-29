import { NextResponse } from 'next/server';
import { getCached, setCache } from '@/lib/cache';
import { FEAR_WEIGHTS, FEAR_NORMALIZATION, getFearLabel } from '@/lib/constants';
import type { AssetPrice, FearGaugeData } from '@/lib/types';

const CACHE_KEY = 'fear-gauge';
const CACHE_TTL = 5 * 60 * 1000;
const CACHE_HEADERS = { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' };

function computeFearScore(assets: AssetPrice[]): FearGaugeData {
  const gold = assets.find((a) => a.symbol === 'XAU/USD');
  const dxy = assets.find((a) => a.symbol === 'DXY');
  const chf = assets.find((a) => a.symbol === 'USD/CHF');
  const jpy = assets.find((a) => a.symbol === 'USD/JPY');

  // Gold rising = fear (positive contribution)
  // DXY rising = fear (positive contribution — flight to USD)
  // CHF falling (USD/CHF rising) = less fear; CHF strengthening (USD/CHF falling) = more fear
  // JPY falling (USD/JPY rising) = less fear; JPY strengthening (USD/JPY falling) = more fear

  const goldPct = gold?.changePct24h || 0;
  const dxyPct = dxy?.changePct24h || 0;
  // Invert CHF and JPY: if USD/CHF drops, CHF is strengthening = more fear
  const chfStrength = -(chf?.changePct24h || 0);
  const jpyStrength = -(jpy?.changePct24h || 0);

  // Raw score: weighted sum of percentage changes
  const rawScore =
    FEAR_WEIGHTS.gold * goldPct +
    FEAR_WEIGHTS.dxy * dxyPct +
    FEAR_WEIGHTS.chf * chfStrength +
    FEAR_WEIGHTS.jpy * jpyStrength;

  const normalized = FEAR_NORMALIZATION.baseline + rawScore * FEAR_NORMALIZATION.multiplier;
  const score = Math.max(0, Math.min(100, Math.round(normalized)));
  const label = getFearLabel(score);

  return {
    score,
    label,
    components: {
      gold: Math.round(goldPct * 100) / 100,
      dxy: Math.round(dxyPct * 100) / 100,
      chf: Math.round(chfStrength * 100) / 100,
      jpy: Math.round(jpyStrength * 100) / 100,
    },
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  const cached = getCached<FearGaugeData>(CACHE_KEY);
  if (cached) return NextResponse.json(cached, { headers: CACHE_HEADERS });

  try {
    // Fetch prices from our own API route
    const origin = new URL(request.url).origin;
    const pricesRes = await fetch(`${origin}/api/prices`);

    if (!pricesRes.ok) throw new Error('Failed to fetch prices for fear gauge');
    const prices: AssetPrice[] = await pricesRes.json();

    const fearData = computeFearScore(prices);
    setCache(CACHE_KEY, fearData, CACHE_TTL);

    return NextResponse.json(fearData, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('Fear gauge error:', error);
    return NextResponse.json({ error: 'Failed to compute fear gauge' }, { status: 500 });
  }
}
