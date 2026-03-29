'use client';

import { useState } from 'react';

export function Methodology() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
      >
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9]">
          How the Fear Gauge Works
        </h3>
        <svg
          className={`h-5 w-5 shrink-0 text-[#64748B] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-black/5 p-6 dark:border-white/10">
          <div className="prose prose-sm max-w-none text-[#64748B] dark:text-[#94A3B8]">
            <p>
              The SafeHaven Fear Gauge is a proprietary composite index that measures market
              anxiety by tracking four key safe-haven indicators in real-time.
            </p>

            <h4 className="mt-4 font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Components & Weights
            </h4>
            <ul className="mt-2 space-y-2">
              <li>
                <strong>Gold (XAU/USD) — 35%:</strong> Gold is the classic safe-haven asset.
                When gold prices rise sharply, it typically signals increased market fear and
                uncertainty.
              </li>
              <li>
                <strong>USD Index (DXY) — 25%:</strong> The US Dollar Index measures the
                dollar against a basket of major currencies. A strengthening dollar often
                indicates flight to safety.
              </li>
              <li>
                <strong>Swiss Franc (CHF) — 20%:</strong> The Swiss franc is considered one of
                the world&apos;s safest currencies. CHF strengthening against USD signals risk
                aversion.
              </li>
              <li>
                <strong>Japanese Yen (JPY) — 20%:</strong> The yen traditionally strengthens
                during market stress as carry trades unwind and investors seek safety.
              </li>
            </ul>

            <h4 className="mt-4 font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Score Interpretation
            </h4>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#22C55E]/10 p-3 text-center">
                <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#22C55E]">
                  0-30
                </div>
                <div className="text-xs font-medium text-[#22C55E]">Calm</div>
              </div>
              <div className="rounded-lg bg-[#F59E0B]/10 p-3 text-center">
                <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#F59E0B]">
                  31-60
                </div>
                <div className="text-xs font-medium text-[#F59E0B]">Cautious</div>
              </div>
              <div className="rounded-lg bg-[#EF4444]/10 p-3 text-center">
                <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#EF4444]">
                  61-100
                </div>
                <div className="text-xs font-medium text-[#EF4444]">Fear</div>
              </div>
            </div>

            <h4 className="mt-4 font-semibold text-[#1E293B] dark:text-[#F1F5F9]">Formula</h4>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-[#F8F9FB] p-3 font-[family-name:var(--font-mono)] text-xs dark:bg-[#0F172A]">
{`fear_score = 0.35 × gold_24h_change%
           + 0.25 × dxy_24h_change%
           + 0.20 × chf_strength%
           + 0.20 × jpy_strength%

// Normalized to 0-100 range`}
            </pre>

            <p className="mt-4 text-xs text-[#94A3B8]">
              <strong>Disclaimer:</strong> The Fear Gauge is for informational purposes only
              and should not be considered financial advice. Past performance does not guarantee
              future results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
