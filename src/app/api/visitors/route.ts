import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const NO_CACHE = { 'Cache-Control': 'no-cache, no-store, must-revalidate' };

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// In-memory fallback when KV is not configured
const memStore: { total: number; daily: Record<string, number> } = {
  total: 0,
  daily: {},
};

export async function GET() {
  try {
    const redis = getRedis();
    const today = getToday();

    if (redis) {
      const [todayCount, totalCount] = await Promise.all([
        redis.get<number>(`visitors:${today}`),
        redis.get<number>('visitors:total'),
      ]);
      return NextResponse.json(
        { today: todayCount || 0, total: totalCount || 0 },
        { headers: NO_CACHE },
      );
    }

    return NextResponse.json(
      { today: memStore.daily[today] || 0, total: memStore.total },
      { headers: NO_CACHE },
    );
  } catch (error) {
    console.error('Visitor counter GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const redis = getRedis();
    const today = getToday();

    if (redis) {
      const [todayCount, totalCount] = await Promise.all([
        redis.incr(`visitors:${today}`),
        redis.incr('visitors:total'),
      ]);
      return NextResponse.json(
        { today: todayCount, total: totalCount },
        { headers: NO_CACHE },
      );
    }

    // Fallback to in-memory
    memStore.total += 1;
    memStore.daily[today] = (memStore.daily[today] || 0) + 1;
    return NextResponse.json(
      { today: memStore.daily[today], total: memStore.total },
      { headers: NO_CACHE },
    );
  } catch (error) {
    console.error('Visitor counter POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
