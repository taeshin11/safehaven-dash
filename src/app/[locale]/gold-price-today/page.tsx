import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gold Price Today — Live XAU/USD Price & 7-Day Chart | SafeHaven Dash',
  description:
    'Check today\'s gold price (XAU/USD) with live updates, 7-day sparkline chart, and 24-hour change. Free real-time gold tracking powered by SafeHaven Dash.',
  keywords: [
    'gold price today',
    'gold price live',
    'xau usd price',
    'gold rate today',
    'gold price chart',
    'is gold going up',
    'gold price per ounce',
    'gold market today',
    'current gold price',
    'gold price forecast',
  ],
  alternates: { canonical: '/gold-price-today' },
  openGraph: {
    title: 'Gold Price Today — Live XAU/USD | SafeHaven Dash',
    description: 'Real-time gold price with 7-day chart and 24h change. Free, fast, no sign-up.',
    url: 'https://safehaven-dash.vercel.app/gold-price-today',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the gold price today?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The live gold price is updated every 5 minutes on SafeHaven Dash. Visit our dashboard to see the current XAU/USD price with a 7-day trend chart and 24-hour percentage change.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does gold go up during market fear?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold is a safe-haven asset. When investors fear economic uncertainty, stock crashes, or geopolitical risks, they buy gold as a store of value. This increased demand drives prices up. Our Fear Gauge tracks this relationship in real-time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is gold a good investment in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold has historically been a strong hedge against inflation and currency devaluation. Use SafeHaven Dash to track gold alongside the USD index, CHF, and JPY to understand the current safe-haven sentiment before making investment decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the gold price updated on SafeHaven Dash?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold prices are fetched from multiple free APIs and cached for 5 minutes server-side. The client auto-refreshes every 60 seconds to ensure you see near-real-time data.',
      },
    },
  ],
};

export default function GoldPriceTodayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
            Gold Price Today
          </h1>
          <p className="mt-3 text-lg text-[#64748B] dark:text-[#94A3B8]">
            Live XAU/USD price with 7-day chart, updated every 5 minutes. Track whether gold is
            signaling market fear or calm.
          </p>
        </header>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1E293B] sm:p-8">
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#B8960E] hover:shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 12l6-6M3 12l6 6" />
              </svg>
              View Live Gold Price on Dashboard
            </Link>
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">
              Why Track Gold Prices?
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Gold (XAU/USD) is the world&apos;s most watched safe-haven asset. When markets panic,
              gold typically rises as investors flee riskier assets. Tracking gold in real-time
              alongside other safe-haven currencies gives you a complete picture of market
              sentiment.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              Gold&apos;s Role in the Fear Gauge
            </h2>
            <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              On SafeHaven Dash, gold carries the highest weight (35%) in our composite Fear Gauge.
              When gold prices rise sharply, it&apos;s often a sign that investors are worried about
              the economy, geopolitics, or inflation. Our Fear Gauge combines gold with the USD
              index, Swiss franc, and Japanese yen to give you a single number (0-100) that
              summarizes market fear.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              How to Read Gold Price Charts
            </h2>
            <ul className="text-[#475569] dark:text-[#94A3B8] space-y-2">
              <li><strong>Rising gold + rising USD</strong> = strong flight to safety</li>
              <li><strong>Rising gold + falling USD</strong> = inflation hedge / dollar weakness</li>
              <li><strong>Falling gold + rising stocks</strong> = risk-on sentiment, calm markets</li>
              <li><strong>Gold flat</strong> = markets are in a wait-and-see mode</li>
            </ul>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mt-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 mt-4">
              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  What is the gold price today?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  The live gold price is updated every 5 minutes on our{' '}
                  <Link href="/" className="text-[#2563EB] hover:underline">dashboard</Link>.
                  You&apos;ll see the current XAU/USD price, 24-hour change, and a 7-day sparkline chart.
                </p>
              </details>

              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  Why does gold go up during market fear?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  Gold is a safe-haven asset. When investors fear economic uncertainty, stock market
                  crashes, or geopolitical risks, they buy gold as a store of value. This increased
                  demand drives the price up.
                </p>
              </details>

              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  How often is the gold price updated?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  Server-side: every 5 minutes. Client-side: auto-refreshes every 60 seconds.
                  The data comes from multiple free APIs with automatic fallbacks.
                </p>
              </details>

              <details className="rounded-xl bg-[#F8F9FB] dark:bg-[#0F172A] p-4">
                <summary className="cursor-pointer font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
                  Is this real-time gold data free?
                </summary>
                <p className="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
                  Yes! SafeHaven Dash is 100% free. We use free public APIs and display ads to cover costs.
                  No sign-up, no paywall, no premium tier required.
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
