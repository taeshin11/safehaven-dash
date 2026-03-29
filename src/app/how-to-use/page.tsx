import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Use & FAQ — SafeHaven Dash | Gold & Fear Gauge Guide',
  description:
    'Learn how to use SafeHaven Dash to track gold prices, safe-haven currencies, and the Fear Gauge. Answers to frequently asked questions.',
  keywords: [
    'how to use safehaven dash',
    'gold price tracker guide',
    'fear gauge explained',
    'safe haven FAQ',
    'dollar index tracker help',
  ],
  openGraph: {
    title: 'How to Use & FAQ — SafeHaven Dash',
    description:
      'Step-by-step guide and FAQ for using SafeHaven Dash to monitor safe-haven assets and market fear.',
    url: 'https://safehaven-dash.vercel.app/how-to-use',
  },
};

export default function HowToUsePage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
        How to Use SafeHaven Dash
      </h1>

      <section className="mt-8 space-y-8 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        <p>
          SafeHaven Dash is designed to be intuitive — no registration, no setup, no learning
          curve. Here&apos;s how to get the most out of it in three simple steps.
        </p>

        {/* Step 1 */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-[#1E293B]">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] font-[family-name:var(--font-mono)] text-lg font-bold text-white">
              1
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Check the Fear Gauge
            </h2>
          </div>
          <p>
            The moment you land on SafeHaven Dash, the <strong>Fear Gauge</strong> at the top of
            the page shows you the current market fear level (0-100). Green means calm markets,
            amber signals caution, and red indicates elevated fear. The gauge updates automatically
            every 60 seconds, so you always see the latest reading without refreshing the page.
          </p>
          <p className="mt-3">
            Below the gauge, you&apos;ll see the <strong>component breakdown</strong> showing how
            much each asset (Gold, DXY, CHF, JPY) is contributing to the overall score. This helps
            you understand <em>which</em> safe-haven is driving the sentiment, not just <em>how
            much</em> fear exists.
          </p>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-[#1E293B]">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] font-[family-name:var(--font-mono)] text-lg font-bold text-white">
              2
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Monitor Live Asset Prices
            </h2>
          </div>
          <p>
            Scroll down to the <strong>Live Safe Haven Prices</strong> section. Each card displays
            the current price, 24-hour change (in both absolute and percentage terms), and a{' '}
            <strong>7-day sparkline chart</strong> showing the recent trend.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            <li><strong>Gold (XAU/USD):</strong> The spot price of one troy ounce of gold in US dollars.</li>
            <li><strong>USD Index (DXY):</strong> The dollar&apos;s value against a basket of six major currencies, computed using the ICE methodology.</li>
            <li><strong>USD/CHF:</strong> How many Swiss Francs one US dollar buys. A falling value means CHF is strengthening.</li>
            <li><strong>USD/JPY:</strong> How many Japanese Yen one US dollar buys. A falling value means JPY is strengthening.</li>
          </ul>
          <p className="mt-3">
            Green arrows (▲) indicate the asset has risen in the last 24 hours; red arrows (▼)
            indicate a decline. The sparkline gives you a quick visual of the week&apos;s momentum
            without needing to open a separate charting tool.
          </p>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-[#1E293B]">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E] font-[family-name:var(--font-mono)] text-lg font-bold text-white">
              3
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
              Calculate Your Personal Fear Score
            </h2>
          </div>
          <p>
            Use the <strong>&ldquo;Calculate Your Fear Score&rdquo;</strong> interactive widget to
            see how your portfolio exposure relates to the current market fear. Select the
            safe-haven assets you currently hold (gold, USD, CHF, JPY, Bitcoin, Treasury Bonds),
            and the tool will display the current fear score in context of your holdings.
          </p>
          <p className="mt-3">
            Click <strong>&ldquo;Calculate &amp; Record&rdquo;</strong> to anonymously record your
            response. This data helps us improve the dashboard and understand how investors are
            positioned during different market conditions. No personal information is collected.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9] pt-4">
          Frequently Asked Questions
        </h2>

        {[
          {
            q: 'Is SafeHaven Dash really free? What\'s the catch?',
            a: 'Yes, SafeHaven Dash is 100% free to use with no registration required. We sustain the service through non-intrusive advertising. Our entire infrastructure runs on free-tier services (Vercel for hosting, free public APIs for data), so our operating cost is literally $0/month. There is no premium tier, no paywall, and no hidden fees.',
          },
          {
            q: 'How often is the data updated?',
            a: 'Price data is refreshed from our API providers every 5 minutes on the server side, and the dashboard automatically fetches the latest data every 60 seconds on the client side. This means you see near-real-time data without manually refreshing the page. Note that FX rates are sourced from the ECB via the Frankfurter API and may reflect closing rates rather than live interbank quotes.',
          },
          {
            q: 'What is the Fear Gauge and how accurate is it?',
            a: 'The Fear Gauge is a proprietary composite index that combines 24-hour price changes in Gold, DXY, CHF, and JPY using a weighted formula (35%, 25%, 20%, 20% respectively). It is designed as a directional indicator of safe-haven demand, not a precise predictive model. It correlates with established fear indices like the VIX but focuses specifically on safe-haven asset flows. It should be used as one data point among many in your investment analysis.',
          },
          {
            q: 'Can I use SafeHaven Dash on my phone?',
            a: 'Absolutely. SafeHaven Dash is built mobile-first and works beautifully on any device from 320px screens (iPhone SE) to 4K monitors. The layout automatically adapts — cards stack vertically on phones and arrange in a 2x2 grid on larger screens. Dark mode is fully supported and respects your system preference.',
          },
          {
            q: 'Why don\'t I see the USD Index (DXY) on other free sites?',
            a: 'The DXY is typically a proprietary index owned by ICE (Intercontinental Exchange) and is not freely available via most public APIs. SafeHaven Dash computes it synthetically from individual currency pairs (EUR/USD, GBP/USD, USD/JPY, USD/CAD, USD/SEK, USD/CHF) using the official ICE basket weights. Our calculation closely approximates the official DXY value.',
          },
          {
            q: 'What happens if the data APIs go down?',
            a: 'We built a multi-provider fallback system. If our primary data source (Frankfurter API) is unavailable, we automatically switch to secondary providers. All API responses are cached for 5 minutes, so a brief outage won\'t affect your experience. If data is stale, a "Delayed" badge appears on the affected asset card.',
          },
          {
            q: 'Is this financial advice?',
            a: 'No. SafeHaven Dash is an informational tool only. We do not provide investment recommendations, portfolio management, or financial advisory services. The Fear Gauge is an educational indicator, not a trading signal. Always conduct your own research and consult a qualified financial advisor before making investment decisions.',
          },
        ].map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-[#1E293B]"
          >
            <summary className="cursor-pointer list-none p-5 font-[family-name:var(--font-heading)] font-semibold text-[#1E293B] dark:text-[#F1F5F9] transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
              {faq.q}
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </section>

      <div className="mt-12">
        <Link
          href="/"
          className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
