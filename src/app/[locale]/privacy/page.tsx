import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy — SafeHaven Dash',
  description:
    'Privacy policy for SafeHaven Dash. Learn how we handle data, cookies, and third-party services on our free financial dashboard.',
  openGraph: {
    title: 'Privacy Policy — SafeHaven Dash',
    description: 'How SafeHaven Dash handles your data and privacy.',
    url: 'https://safehaven-dash.vercel.app/privacy',
  },
};

const BASE = 'https://safehaven-dash.vercel.app';

export default function PrivacyPage() {
  return (
    <>
    <BreadcrumbJsonLd items={[{ name: 'Home', url: BASE }, { name: 'Privacy Policy', url: `${BASE}/privacy` }]} />
    <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[#94A3B8]">Last updated: March 29, 2025</p>

      <article className="prose-custom mt-8 space-y-6 text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          1. Introduction
        </h2>
        <p>
          SafeHaven Dash (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the
          website at <strong>safehaven-dash.vercel.app</strong>. This Privacy Policy explains how we
          collect, use, and protect information when you use our free financial dashboard service.
        </p>
        <p>
          By using SafeHaven Dash, you agree to the collection and use of information in accordance
          with this policy. We are committed to protecting your privacy and handling any personal
          information we obtain with care and respect.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          2. Information We Collect
        </h2>
        <h3 className="font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          2.1 Information You Provide
        </h3>
        <p>
          When you use the &ldquo;Calculate Your Fear Score&rdquo; feature, you may voluntarily
          submit the following anonymous data: selected asset types, computed fear score, browser
          user agent, and referrer URL. This data is stored in a Google Sheets document for
          aggregate analysis. <strong>No personally identifiable information (name, email, address,
          phone number) is collected through this feature.</strong>
        </p>

        <h3 className="font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          2.2 Automatically Collected Information
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Visitor Count:</strong> We track anonymous daily and total visitor counts using
            Upstash Redis. This counter uses a session-based deduplication mechanism (via
            sessionStorage) and does not store IP addresses, device fingerprints, or any personally
            identifiable information.
          </li>
          <li>
            <strong>Hosting Analytics:</strong> Our hosting provider (Vercel) may collect standard
            server logs including IP addresses, browser type, referring pages, and timestamps. This
            data is subject to Vercel&apos;s own privacy policy.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          3. Cookies and Local Storage
        </h2>
        <p>We use the following client-side storage mechanisms:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Theme Preference (localStorage):</strong> We store your light/dark mode
            preference locally on your device under the key <code>sh-theme</code>. This data
            never leaves your browser.
          </li>
          <li>
            <strong>Session Deduplication (sessionStorage):</strong> A temporary flag
            (<code>sh_visited</code>) is stored for the duration of your browser session to prevent
            duplicate visitor counting. It is automatically cleared when you close your browser.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          4. Third-Party Services
        </h2>
        <p>SafeHaven Dash uses the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Adsterra (Advertising):</strong> We display ads provided by Adsterra to support
            the free operation of this service. Adsterra may use cookies and tracking technologies
            to serve relevant advertisements. Please refer to{' '}
            <a href="https://adsterra.com/privacy-policy/" className="text-[#2563EB] underline dark:text-[#60A5FA]" target="_blank" rel="noopener noreferrer">
              Adsterra&apos;s Privacy Policy
            </a>{' '}
            for details on their data practices.
          </li>
          <li>
            <strong>Google AdSense (Advertising):</strong> We may use Google AdSense to display
            ads. Google uses cookies (including the DoubleClick cookie) to serve ads based on your
            visits to this and other websites. You can opt out of personalized advertising by
            visiting{' '}
            <a href="https://www.google.com/settings/ads" className="text-[#2563EB] underline dark:text-[#60A5FA]" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </li>
          <li>
            <strong>Vercel (Hosting):</strong> Our website is hosted on Vercel. See{' '}
            <a href="https://vercel.com/legal/privacy-policy" className="text-[#2563EB] underline dark:text-[#60A5FA]" target="_blank" rel="noopener noreferrer">
              Vercel&apos;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Google Sheets (Data Storage):</strong> Anonymous form submissions are stored
            via Google Apps Script. See{' '}
            <a href="https://policies.google.com/privacy" className="text-[#2563EB] underline dark:text-[#60A5FA]" target="_blank" rel="noopener noreferrer">
              Google&apos;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Upstash (Visitor Counter):</strong> Anonymous visitor counts are stored using
            Upstash Redis. See{' '}
            <a href="https://upstash.com/trust/privacy.pdf" className="text-[#2563EB] underline dark:text-[#60A5FA]" target="_blank" rel="noopener noreferrer">
              Upstash Privacy Policy
            </a>.
          </li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          5. Data Retention
        </h2>
        <p>
          Anonymous form submissions are retained indefinitely for aggregate analysis. Visitor
          counts are retained for the lifetime of the service. Since we do not collect personally
          identifiable information, there is no personal data to delete upon request.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          6. Your Rights
        </h2>
        <p>
          Since SafeHaven Dash does not collect personally identifiable information, traditional
          data subject rights (access, rectification, deletion, portability) are not applicable.
          However, you can:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clear your browser&apos;s localStorage to reset your theme preference.</li>
          <li>Use your browser&apos;s ad-blocking or cookie-blocking features to prevent third-party tracking.</li>
          <li>Opt out of personalized ads via your browser or Google Ads Settings.</li>
        </ul>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          7. Children&apos;s Privacy
        </h2>
        <p>
          SafeHaven Dash is not directed at children under 13. We do not knowingly collect
          information from children. If you believe a child has provided us with data, please
          contact us and we will take steps to remove it.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated revision date. Your continued use of SafeHaven Dash after changes
          constitutes acceptance of the revised policy.
        </p>

        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#1E293B] dark:text-[#F1F5F9]">
          9. Contact
        </h2>
        <p>
          For privacy-related inquiries, please email us at{' '}
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
    </>
  );
}
