import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — SafeHaven Dash',
  description:
    'Terms of service for SafeHaven Dash. Read our usage terms, disclaimers, and limitation of liability for our free financial dashboard.',
  openGraph: {
    title: 'Terms of Service — SafeHaven Dash',
    description: 'Usage terms, disclaimers, and policies for SafeHaven Dash.',
    url: 'https://safehaven-dash.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[#94A3B8]">Last updated: March 29, 2026</p>

      <article className="mt-8 space-y-6 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using SafeHaven Dash (the &ldquo;Service&rdquo;), available at{' '}
          <strong>safehaven-dash.vercel.app</strong>, you accept and agree to be bound by these
          Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do
          not use the Service.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          2. Description of Service
        </h2>
        <p>
          SafeHaven Dash is a <strong>free, ad-supported web application</strong> that provides
          real-time and near-real-time financial data for safe-haven assets including Gold (XAU/USD),
          the US Dollar Index (DXY), Swiss Franc (USD/CHF), and Japanese Yen (USD/JPY). The Service
          also provides a proprietary &ldquo;Fear Gauge&rdquo; index and an interactive calculator.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          3. No Financial Advice Disclaimer
        </h2>
        <p>
          <strong>SafeHaven Dash is NOT a financial advisor, broker, or investment service.</strong>{' '}
          All information provided on this website — including prices, charts, the Fear Gauge
          score, and any other data — is for <strong>informational and educational purposes
          only</strong>.
        </p>
        <p>
          Nothing on this website constitutes a recommendation, solicitation, or offer to buy or
          sell any securities, commodities, currencies, or other financial instruments. You should
          not rely on the information presented here as the sole basis for any investment decision.
          Always consult a qualified financial advisor before making investment decisions.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          4. Data Accuracy
        </h2>
        <p>
          While we strive to provide accurate and up-to-date information, we make{' '}
          <strong>no warranties or representations</strong> regarding the accuracy, completeness,
          or timeliness of any data displayed on SafeHaven Dash. Data is sourced from third-party
          APIs and may be delayed, inaccurate, or temporarily unavailable. The Fear Gauge is a
          proprietary calculation and should not be treated as a definitive measure of market
          conditions.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          5. Acceptable Use
        </h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
          <li>Attempt to interfere with, compromise, or disrupt the Service or its servers.</li>
          <li>Scrape, crawl, or use automated tools to extract data from the Service at a rate exceeding reasonable personal use.</li>
          <li>Redistribute, resell, or commercially exploit the Fear Gauge data or dashboard content without our prior written consent.</li>
          <li>Submit false, misleading, or spam data through the interactive calculator.</li>
          <li>Attempt to circumvent any access controls, rate limits, or security measures.</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          6. Intellectual Property
        </h2>
        <p>
          The SafeHaven Dash name, logo, Fear Gauge concept, and dashboard design are proprietary.
          The underlying source code is open-source and available under the MIT License on GitHub.
          You are free to fork, modify, and distribute the code under the terms of that license,
          but you may not use the SafeHaven Dash brand or trademarks without permission.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          7. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by applicable law, SafeHaven Dash and its creators shall
          not be liable for any direct, indirect, incidental, special, consequential, or punitive
          damages arising out of or relating to your use of or inability to use the Service. This
          includes, without limitation, damages for loss of profits, goodwill, data, or other
          intangible losses, even if we have been advised of the possibility of such damages.
        </p>
        <p>
          <strong>You expressly acknowledge and agree that:</strong> (a) the Service is provided
          &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind;
          (b) we do not guarantee uninterrupted or error-free operation; (c) any investment
          decisions you make based on information from this Service are at your own risk.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          8. Third-Party Services &amp; Advertising
        </h2>
        <p>
          SafeHaven Dash displays advertisements from third-party networks (including Adsterra and
          potentially Google AdSense). We are not responsible for the content, accuracy, or
          practices of these advertisers. Clicking on advertisements may redirect you to
          third-party websites governed by their own terms and privacy policies.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          9. Service Availability
        </h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service (or any part thereof)
          at any time without prior notice. We shall not be liable to you or any third party for
          any modification, suspension, or discontinuation of the Service.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          10. Changes to These Terms
        </h2>
        <p>
          We may revise these Terms at any time by posting the updated version on this page. Your
          continued use of the Service after changes are posted constitutes your acceptance of the
          revised Terms. We encourage you to review this page periodically.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          11. Governing Law
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          jurisdiction in which the Service operator resides, without regard to conflict of law
          principles.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          12. Contact
        </h2>
        <p>
          For questions about these Terms, please email{' '}
          <a
            href="mailto:taeshinkim11@gmail.com"
            className="text-[#2563EB] underline dark:text-[#60A5FA]"
          >
            taeshinkim11@gmail.com
          </a>
          .
        </p>
      </article>

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
