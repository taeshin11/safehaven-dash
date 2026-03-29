'use client';

import useSWR from 'swr';
import { AssetCard } from './AssetCard';
import { FearGauge } from './FearGauge';
import { CalculateFearScore } from './CalculateFearScore';
import { AdSlot } from './AdSlot';
import { Methodology } from './Methodology';
import { SkeletonCard, SkeletonGauge } from './SkeletonCard';
import type { AssetPrice, FearGaugeData } from '@/lib/types';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });

export function Dashboard() {
  const { data: prices, error: pricesError } = useSWR<AssetPrice[]>('/api/prices', fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  });

  const { data: fearData, error: fearError } = useSWR<FearGaugeData>('/api/fear-gauge', fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  });

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
      {/* Fear Gauge — Hero Section */}
      <section className="mb-8 sm:mb-12">
        {fearError ? (
          <div className="rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-8 text-center text-sm text-[#EF4444]">
            Unable to load Fear Gauge. Please try again later.
          </div>
        ) : !fearData ? (
          <SkeletonGauge />
        ) : (
          <FearGauge data={fearData} />
        )}
      </section>

      {/* Adsterra Native Ad — between Fear Gauge and Asset Cards (hidden on mobile first viewport) */}
      <AdSlot type="native" className="mb-8 hidden sm:block sm:mb-12" />

      {/* Asset Price Cards */}
      <section>
        <h2 className="mb-6 font-[family-name:var(--font-heading)] text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9]">
          Live Safe Haven Prices
        </h2>
        {pricesError ? (
          <div className="rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-8 text-center text-sm text-[#EF4444]">
            Unable to load prices. Please try again later.
          </div>
        ) : !prices ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {prices.map((asset) => (
              <AssetCard key={asset.symbol} asset={asset} />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Section — Calculate Fear Score */}
      <section className="mt-8 sm:mt-12">
        <CalculateFearScore />
      </section>

      {/* Adsterra Banner Ad — 728x90 desktop / 320x50 mobile */}
      <AdSlot type="banner" className="mt-8 sm:mt-12" />

      {/* Methodology Accordion */}
      <section id="methodology" className="mt-8 sm:mt-12">
        <Methodology />
      </section>

      {/* Adsterra Social Bar — floating */}
      <AdSlot type="social-bar" />
    </main>
  );
}
