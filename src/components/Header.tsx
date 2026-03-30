'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDict } from '@/i18n/DictionaryProvider';
import { localeNames, locales, type Locale } from '@/i18n/config';

export function Header() {
  const { locale } = useDict();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [langOpen, setLangOpen] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.toggle('dark');
    setTheme(next);
    localStorage.setItem('sh-theme', next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0F172A]/80">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#2563EB]">
            <span className="text-sm font-bold text-white">SH</span>
          </div>
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9]">
            SafeHaven Dash
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-black/5 dark:text-[#94A3B8] dark:hover:bg-white/10"
              aria-label="Change language"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              {localeNames[locale as Locale] ?? 'EN'}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-xl border border-black/5 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-[#1E293B]">
                {locales.map((loc) => (
                  <a
                    key={loc}
                    href={`/${loc}`}
                    className={`block px-3 py-1.5 text-xs transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                      loc === locale
                        ? 'font-semibold text-[#2563EB] dark:text-[#60A5FA]'
                        : 'text-[#64748B] dark:text-[#94A3B8]'
                    }`}
                  >
                    {localeNames[loc]}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-black/5 dark:text-[#94A3B8] dark:hover:bg-white/10"
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
