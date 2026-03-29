'use client';

import { useState } from 'react';
import useSWR from 'swr';
import type { FearGaugeData } from '@/lib/types';

const ASSETS = [
  { id: 'gold', label: 'Gold (XAU/USD)', icon: '🥇' },
  { id: 'usd', label: 'USD Index (DXY)', icon: '💵' },
  { id: 'chf', label: 'Swiss Franc (CHF)', icon: '🇨🇭' },
  { id: 'jpy', label: 'Japanese Yen (JPY)', icon: '🇯🇵' },
  { id: 'btc', label: 'Bitcoin (BTC)', icon: '₿' },
  { id: 'bonds', label: 'US Treasury Bonds', icon: '📊' },
];

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });

export function CalculateFearScore() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { data: fearData } = useSWR<FearGaugeData>('/api/fear-gauge', fetcher, {
    revalidateOnFocus: false,
  });

  const toggleAsset = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setToast({ type: 'error', message: 'Please select at least one asset.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // Rate limit: 1 submission per session
    if (submitted) {
      setToast({ type: 'error', message: 'You have already submitted this session.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assets_selected: selected,
            fear_score: fearData?.score ?? 0,
            user_agent: navigator.userAgent,
            referrer: document.referrer || 'direct',
          }),
          mode: 'no-cors',
        });
      }
      setSubmitted(true);
      setToast({ type: 'success', message: 'Your fear score has been recorded!' });
    } catch {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] sm:p-8">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-2xl">
        Calculate Your Fear Score
      </h2>
      <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
        Select the safe-haven assets you currently hold to see your personalized fear exposure.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ASSETS.map((asset) => {
          const isSelected = selected.includes(asset.id);
          return (
            <button
              key={asset.id}
              onClick={() => toggleAsset(asset.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] dark:border-[#60A5FA] dark:bg-[#60A5FA]/10 dark:text-[#60A5FA]'
                  : 'border-black/10 bg-transparent text-[#1E293B] hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 dark:border-white/10 dark:text-[#F1F5F9] dark:hover:border-[#60A5FA]/30'
              }`}
            >
              <span className="text-lg">{asset.icon}</span>
              <span className="truncate">{asset.label}</span>
              {isSelected && (
                <svg
                  className="ml-auto h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {fearData && selected.length > 0 && (
        <div className="mt-5 rounded-xl bg-[#F8F9FB] p-4 text-center dark:bg-[#0F172A]">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">Current Market Fear Score</p>
          <p className="font-[family-name:var(--font-mono)] text-3xl font-bold" style={{
            color: fearData.score <= 30 ? '#22C55E' : fearData.score <= 60 ? '#F59E0B' : '#EF4444',
          }}>
            {fearData.score}
          </p>
          <p className="text-xs text-[#94A3B8]">
            You hold {selected.length} of {ASSETS.length} safe-haven assets
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={handleSubmit}
          disabled={submitting || submitted}
          className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#3b82f6] dark:hover:bg-[#2563EB]"
        >
          {submitting ? 'Submitting...' : submitted ? 'Submitted!' : 'Calculate & Record'}
        </button>
        <p id="privacy" className="text-[10px] leading-relaxed text-[#94A3B8] dark:text-[#64748B] sm:max-w-xs sm:text-right">
          We collect anonymous usage data to improve the service. No personal information is stored.
        </p>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-[#22C55E]/10 text-[#22C55E]'
              : 'bg-[#EF4444]/10 text-[#EF4444]'
          }`}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}
