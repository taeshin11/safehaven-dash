import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'About Us — SafeHaven Dash | Free Gold & Safe Haven Tracker',
  description:
    'Learn about SafeHaven Dash, a free real-time dashboard tracking gold, USD index, CHF, JPY with a custom Fear Gauge for safe-haven asset monitoring.',
  keywords: [
    'about safehaven dash',
    'gold price tracker',
    'safe haven dashboard',
    'fear gauge',
    'financial dashboard tool',
  ],
  openGraph: {
    title: 'About Us — SafeHaven Dash',
    description:
      'Learn about SafeHaven Dash, a free real-time dashboard tracking gold, USD index, CHF, JPY with a custom Fear Gauge.',
    url: 'https://safehaven-dash.vercel.app/about',
  },
};

const BASE = 'https://safehaven-dash.vercel.app';

export default function AboutPage() {
  return (
    <>
    <BreadcrumbJsonLd items={[{ name: 'Home', url: BASE }, { name: 'About', url: `${BASE}/about` }]} />
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
        About SafeHaven Dash
      </h1>

      <section className="mt-8 space-y-6 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          What Is SafeHaven Dash?
        </h2>
        <p>
          SafeHaven Dash is a <strong>free, real-time financial dashboard</strong> designed to give
          retail investors, macro-economy watchers, and FX traders a single, clean view of the
          world&apos;s most important safe-haven assets. We track{' '}
          <strong>Gold (XAU/USD), the US Dollar Index (DXY), Swiss Franc (USD/CHF),</strong> and{' '}
          <strong>Japanese Yen (USD/JPY)</strong> — the four pillars of safety during market
          turbulence.
        </p>
        <p>
          At the heart of our dashboard sits the <strong>Fear Gauge</strong>, a proprietary
          composite index that distills these four asset movements into a single number from 0 to
          100, answering the question every investor asks during a crisis:{' '}
          <em>&ldquo;How scared is the market right now?&rdquo;</em>
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          The Problem We Solve
        </h2>
        <p>
          During market stress — geopolitical crises, central bank surprises, inflation shocks —
          investors scramble across multiple platforms to check gold prices, currency pairs, and
          risk sentiment indicators. Existing tools are often cluttered with ads, locked behind
          paywalls, or scatter safe-haven data across dozens of pages.
        </p>
        <p>
          SafeHaven Dash consolidates everything into a <strong>single-page, mobile-friendly
          dashboard</strong> that loads in under 2 seconds, auto-refreshes every 60 seconds, and
          costs absolutely nothing to use. No registration. No paywall. No clutter.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          Who Is This For?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Retail FX &amp; Commodity Traders</strong> — Monitor gold and safe-haven
            currencies in one view before placing trades.
          </li>
          <li>
            <strong>Macro-Economy Enthusiasts</strong> — Stay informed about risk sentiment and
            capital flows without subscribing to Bloomberg or Reuters.
          </li>
          <li>
            <strong>Financial Bloggers &amp; Analysts</strong> — Embed or reference our Fear Gauge
            in your content as a real-time sentiment snapshot.
          </li>
          <li>
            <strong>Everyday Investors</strong> — Anyone searching &ldquo;gold price today&rdquo;
            or &ldquo;is the market crashing?&rdquo; deserves a clear, instant answer.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          How the Fear Gauge Works
        </h2>
        <p>
          Our Fear Gauge is a <strong>weighted composite index</strong> computed on our servers
          every 5 minutes. It combines the 24-hour percentage change of four safe-haven indicators:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Gold (XAU/USD) — 35% weight:</strong> Rising gold is the classic flight-to-safety signal.</li>
          <li><strong>US Dollar Index (DXY) — 25% weight:</strong> A strengthening dollar indicates capital flight to the world&apos;s reserve currency.</li>
          <li><strong>Swiss Franc (CHF) — 20% weight:</strong> CHF strengthening reflects European risk aversion.</li>
          <li><strong>Japanese Yen (JPY) — 20% weight:</strong> JPY appreciation signals carry-trade unwinding and global deleveraging.</li>
        </ul>
        <p>
          The raw weighted sum is normalized to a 0-100 scale: <strong>0-30 (Calm)</strong>,{' '}
          <strong>31-60 (Cautious)</strong>, <strong>61-100 (Fear)</strong>. The result is displayed
          as an animated gauge with real-time updates.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          Our Technology
        </h2>
        <p>
          SafeHaven Dash is built with <strong>Next.js</strong> for server-side rendering and
          SEO optimization, <strong>Tailwind CSS</strong> for a responsive mobile-first design,
          and <strong>Recharts</strong> for interactive sparkline charts. We aggregate data from
          multiple free API providers (Frankfurter API for FX rates, fawazahmed0 for gold) with
          server-side caching and intelligent fallback chains to ensure 99.9% uptime at zero
          infrastructure cost.
        </p>
        <p>
          The entire project is <strong>open-source</strong> and deployed on{' '}
          <strong>Vercel&apos;s free tier</strong>, proving that powerful financial tools don&apos;t
          have to be expensive.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          Contact Us
        </h2>
        <p>
          Have feedback, suggestions, or partnership inquiries? We&apos;d love to hear from you.
          Reach us at{' '}
          <a
            href="mailto:taeshinkim11@gmail.com"
            className="text-[#2563EB] underline hover:text-[#1d4ed8] dark:text-[#60A5FA]"
          >
            taeshinkim11@gmail.com
          </a>
          .
        </p>
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
    </>
  );
}
