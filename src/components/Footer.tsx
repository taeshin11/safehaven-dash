import Link from 'next/link';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-8 dark:border-white/10 dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            <p className="font-medium">SafeHaven Dash</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed">
              Data is provided for informational purposes only and should not be considered financial
              advice. Prices may be delayed. Always do your own research before making investment
              decisions.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <nav className="flex flex-wrap justify-center gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <Link href="/about" className="transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                About
              </Link>
              <Link href="/how-to-use" className="transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                How to Use
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Terms
              </Link>
              <a href="#methodology" className="transition-colors hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Methodology
              </a>
            </nav>
            <a
              href="mailto:taeshinkim11@gmail.com"
              className="flex items-center gap-1.5 text-xs text-[#94A3B8] transition-colors hover:text-[#2563EB] dark:text-[#64748B] dark:hover:text-[#60A5FA]"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              Feedback &amp; Suggestions
            </a>
            <p className="text-xs text-[#94A3B8] dark:text-[#64748B]">
              &copy; {new Date().getFullYear()} SafeHaven Dash. All rights reserved.
            </p>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
