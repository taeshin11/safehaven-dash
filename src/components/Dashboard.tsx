'use client';

import useSWR from 'swr';
import { AssetCard } from './AssetCard';
import { FearGauge } from './FearGauge';
import { SkeletonCard, SkeletonGauge } from './SkeletonCard';
import type { AssetPrice, FearGaugeData } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

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
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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

      {/* Ad placeholder — between sections */}
      <section className="mb-8 sm:mb-12">
        {/* ADSTERRA: replace with your native ad unit code after dashboard approval */}
        <div className="hidden sm:block" />
      </section>

      {/* Asset Price Cards */}
      <section>
        <h2 className="mb-6 font-[family-name:var(--font-heading)] text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9]">
          Safe Haven Assets
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
    </main>
  );
}
