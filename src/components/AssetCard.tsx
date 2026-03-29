'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type { AssetPrice } from '@/lib/types';

function formatPrice(price: number, symbol: string): string {
  if (symbol === 'XAU/USD') return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (symbol === 'DXY') return price.toFixed(2);
  if (symbol === 'USD/JPY') return price.toFixed(2);
  return price.toFixed(4);
}

export function AssetCard({ asset }: { asset: AssetPrice }) {
  const isPositive = asset.changePct24h >= 0;
  const changeColor = isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]';
  const sparkColor = isPositive ? '#22C55E' : '#EF4444';

  const chartData = asset.sparkline.map((value, i) => ({ value, index: i }));

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
      {asset.isDelayed && (
        <span className="absolute right-3 top-3 rounded-full bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-medium text-[#F59E0B]">
          Delayed
        </span>
      )}
      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
        {asset.symbol}
      </div>
      <div className="mb-0.5 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">
        {formatPrice(asset.price, asset.symbol)}
      </div>
      <div className={`mb-3 flex items-center gap-1.5 text-sm font-medium ${changeColor}`}>
        <span>{isPositive ? '▲' : '▼'}</span>
        <span>{Math.abs(asset.change24h).toFixed(asset.symbol === 'XAU/USD' ? 2 : 4)}</span>
        <span className="text-xs">({isPositive ? '+' : ''}{asset.changePct24h.toFixed(2)}%)</span>
      </div>
      <div className="h-16 w-full" role="img" aria-label={`${asset.name} 7-day price trend chart`}>
        {chartData.length > 1 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${asset.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={sparkColor}
                strokeWidth={2}
                fill={`url(#grad-${asset.symbol})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-1 text-[10px] text-[#94A3B8] dark:text-[#64748B]">7-day trend</div>
    </div>
  );
}
