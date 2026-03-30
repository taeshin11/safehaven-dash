import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Market Fear Index Today — Live Fear Gauge (0-100) | SafeHaven Dash',
  description:
    'Track market fear in real-time with our composite Fear Gauge. Combines gold, USD index, CHF, and JPY to show if markets are calm, cautious, or in fear.',
  keywords: [
    'market fear index',
    'fear gauge live',
    'market fear indicator',
    'fear and greed index alternative',
    'safe haven fear gauge',
    'market sentiment indicator',
    'is the market scared',
    'flight to safety indicator',
    'market panic index',
    'financial fear gauge',
  ],
  alternates: { canonical: '/market-fear-index' },
  openGraph: {
    title: 'Market Fear Index Today — Live 0-100 Gauge | SafeHaven Dash',
    description: 'Real-time fear gauge combining gold, USD, CHF, JPY. Free, no sign-up.',
    url: 'https://safehaven-dash.vercel.app/market-fear-index',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Market Fear Index?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The SafeHaven Fear Gauge is a composite index (0-100) that measures market fear by tracking safe-haven asset movements: gold (35%), USD index (25%), Swiss franc (20%), and Japanese yen (20%). Scores of 0-30 indicate calm, 31-60 cautious, and 61-100 fear.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the Fear Gauge different from the Fear and Greed Index?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CNN Fear and Greed Index uses stock market indicators (VIX, put/call ratio, etc.). Our Fear Gauge focuses exclusively on safe-haven assets: gold, USD, CHF, and JPY. This makes it more responsive to geopolitical events and global flight-to-safety movements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a high fear score mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A score above 60 means investors are actively moving money into safe-haven assets. Gold is rising, the Swiss franc and Japanese yen are strengthening. This typically happens during market crashes, geopolitical crises, or economic uncertainty.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the Fear Gauge updated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Fear Gauge recalculates every 5 minutes using live price data. The page auto-refreshes every 60 seconds. All data is free and requires no sign-up.',
      },
    },
  ],
};

export default function MarketFearIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
            Market Fear Index Today
          </h1>
          <p className="mt-3 text-lg text-[#64748B] dark:text-[#94A3B8]">
            A real-time composite fear gauge (0-100) that tracks gold, USD, CHF, and JPY to
            measure market sentiment.
          </p>
        </header>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1E293B] sm:p-8">
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#EF4444] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#DC2626] hover:shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 12l6-6M3 12l6 6" />
              </svg>
              View Live Fear Gauge
            </Link>
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">
              What is the SafeHaven Fear Gauge?
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              The SafeHaven Fear Gauge is a proprietary composite index that tracks safe-haven
              asset movements to measure real-time market fear. Unlike stock-market-based
              indicators (VIX, CNN Fear &amp; Greed Index), our gauge focuses on the assets
              investors actually flee to during crises: gold, the US dollar, Swiss franc, and
              Japanese yen.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              How It Works
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-2 text-left font-semibold text-[#1E293B] dark:text-[#F1F5F9]">Component</th>
                    <th className="py-2 text-center font-semibold text-[#1E293B] dark:text-[#F1F5F9]">Weight</th>
                    <th className="py-2 text-left font-semibold text-[#1E293B] dark:text-[#F1F5F9]">Signal</th>
                  </tr>
                </thead>
                <tbody className="text-[#475569] dark:text-[#94A3B8]">
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2">Gold (XAU/USD)</td>
                    <td className="py-2 text-center font-mono">35%</td>
                    <td className="py-2">Rising gold = more fear</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2">USD Index (DXY)</td>
                    <td className="py-2 text-center font-mono">25%</td>
                    <td className="py-2">Rising dollar = flight to safety</td>
                  </tr>
                  <tr className="border-b border-black/5 dark:border-white/5">
                    <td className="py-2">Swiss Franc (CHF)</td>
                    <td className="py-2 text-center font-mono">20%</td>
                    <td className="py-2">CHF strengthening = more fear</td>
                  </tr>
                  <tr>
                    <td className="py-2">Japanese Yen (JPY)</td>
                    <td className="py-2 text-center font-mono">20%</td>
                    <td className="py-2">JPY strengthening = more fear</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              Score Interpretation
            </h2>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="rounded-xl bg-[#22C55E]/10 p-4 text-center">
                <div className="text-2xl font-bold text-[#22C55E]">0-30</div>
                <div className="text-xs font-semibold text-[#22C55E] mt-1">CALM</div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2">
                  Markets are relaxed. Safe-haven demand is low.
                </p>
              </div>
              <div className="rounded-xl bg-[#F59E0B]/10 p-4 text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">31-60</div>
                <div className="text-xs font-semibold text-[#F59E0B] mt-1">CAUTIOUS</div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2">
                  Mixed signals. Investors are watchful.
                </p>
              </div>
              <div className="rounded-xl bg-[#EF4444]/10 p-4 text-center">
                <div className="text-2xl font-bold text-[#EF4444]">61-100</div>
                <div className="text-xs font-semibold text-[#EF4444] mt-1">FEAR</div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2">
                  Active flight to safety. High uncertainty.
                </p>
              </div>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 mt-4">
              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  How is this different from the VIX or Fear &amp; Greed Index?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  The VIX measures S&amp;P 500 option volatility. CNN&apos;s Fear &amp; Greed Index uses
                  7 stock market indicators. Our Fear Gauge focuses on safe-haven assets (gold,
                  USD, CHF, JPY) &mdash; the things investors actually buy when scared. This makes it
                  more responsive to geopolitical and macro events.
                </p>
              </details>

              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  What does a score of 50 mean?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  A score of 50 is the baseline &mdash; it means safe-haven assets haven&apos;t moved
                  significantly in the last 24 hours. The market is in a &quot;wait and see&quot; state.
                </p>
              </details>

              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  Can I use this for trading decisions?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  The Fear Gauge is an informational tool, not financial advice. It shows where
                  safe-haven assets are moving, which can help inform your analysis. Always do your
                  own research and consult a financial advisor.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1d4ed8] hover:shadow-lg"
            >
              Go to Live Dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
