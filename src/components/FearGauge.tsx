'use client';

import { useEffect, useState } from 'react';
import type { FearGaugeData } from '@/lib/types';
import { getFearColor, FEAR_THRESHOLDS } from '@/lib/constants';

// Use static Tailwind classes — dynamic interpolation doesn't work at build time
function getGaugeBg(score: number): string {
  if (score <= FEAR_THRESHOLDS.CALM_MAX) return 'bg-[#22C55E]/10';
  if (score <= FEAR_THRESHOLDS.CAUTIOUS_MAX) return 'bg-[#F59E0B]/10';
  return 'bg-[#EF4444]/10';
}

export function FearGauge({ data }: { data: FearGaugeData }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const color = getFearColor(data.score);
  const bgClass = getGaugeBg(data.score);

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const from = animatedScore;
    const to = data.score;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.score]);

  // SVG gauge arc
  const radius = 80;
  const strokeWidth = 12;
  const cx = 100;
  const cy = 100;
  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle;
  const scoreAngle = startAngle + (animatedScore / 100) * totalAngle;

  function polarToCartesian(angle: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function describeArc(startA: number, endA: number) {
    const start = polarToCartesian(endA);
    const end = polarToCartesian(startA);
    const largeArc = endA - startA > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  }

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] sm:p-8">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-2xl">
          Market Fear Level
        </h2>
        <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">
          Based on gold, USD, CHF, JPY movements
        </p>
      </div>

      <div className="relative mx-auto mt-6 w-[200px]">
        <svg viewBox="0 0 200 130" className="w-full" role="img" aria-label={`Fear Gauge showing ${data.label} at ${animatedScore} out of 100`}>
          {/* Background arc */}
          <path
            d={describeArc(startAngle, endAngle)}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-[#EEF1F6] dark:text-[#334155]"
          />
          {/* Score arc */}
          {animatedScore > 0 && (
            <path
              d={describeArc(startAngle, scoreAngle)}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
          {/* Needle dot */}
          {(() => {
            const pos = polarToCartesian(scoreAngle);
            return <circle cx={pos.x} cy={pos.y} r={6} fill={color} />;
          })()}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span
            className="font-[family-name:var(--font-mono)] text-4xl font-bold"
            style={{ color }}
          >
            {animatedScore}
          </span>
          <span
            className={`mt-1 rounded-full px-3 py-0.5 text-xs font-semibold ${bgClass}`}
            style={{ color }}
          >
            {data.label}
          </span>
        </div>
      </div>

      {/* Component breakdown */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Gold', value: data.components.gold, weight: '35%' },
          { label: 'DXY', value: data.components.dxy, weight: '25%' },
          { label: 'CHF', value: data.components.chf, weight: '20%' },
          { label: 'JPY', value: data.components.jpy, weight: '20%' },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl bg-[#F8F9FB] px-3 py-2 text-center dark:bg-[#0F172A]"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-[#94A3B8]">
              {c.label} ({c.weight})
            </div>
            <div
              className={`font-[family-name:var(--font-mono)] text-sm font-semibold ${c.value >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}
            >
              {c.value >= 0 ? '+' : ''}
              {c.value.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      {/* Methodology tooltip */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          aria-expanded={showTooltip}
          aria-label="Show Fear Gauge calculation methodology"
          className="text-xs text-[#2563EB] transition-colors hover:text-[#1d4ed8] dark:text-[#60A5FA]"
        >
          {showTooltip ? 'Hide' : 'How is this calculated?'}
        </button>
        {showTooltip && (
          <div className="mt-3 rounded-xl bg-[#F8F9FB] p-4 text-left text-xs leading-relaxed text-[#64748B] dark:bg-[#0F172A] dark:text-[#94A3B8]">
            <p className="mb-2 font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Fear Gauge Methodology
            </p>
            <p>
              The SafeHaven Fear Gauge combines 24-hour percentage changes in four safe-haven
              indicators with the following weights:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Gold (XAU/USD): 35% — rising gold = more fear</li>
              <li>USD Index (DXY): 25% — rising dollar = flight to safety</li>
              <li>CHF strength: 20% — Swiss franc strengthening = more fear</li>
              <li>JPY strength: 20% — Japanese yen strengthening = more fear</li>
            </ul>
            <p className="mt-2">
              The composite score is normalized to a 0-100 scale: 0-30 (Calm), 31-60 (Cautious),
              61-100 (Fear).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
