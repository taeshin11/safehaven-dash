'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { useDict } from '@/i18n/DictionaryProvider';

const H1_MAP: Record<string, string> = {
  en: 'Safe Haven Currency & Gold Tracker',
  ko: '안전자산 & 금 실시간 트래커',
  ja: '安全資産＆金リアルタイムトラッカー',
  zh: '避险资产与黄金实时追踪器',
  es: 'Rastreador de Oro y Activos Refugio',
};

export function HomeContent() {
  const { locale } = useDict();

  return (
    <ThemeProvider>
      <Header />
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <h1 className="mb-8 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:mb-12 sm:text-4xl">
          {H1_MAP[locale] ?? H1_MAP.en}
        </h1>
      </div>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
      <Footer />
      <FeedbackWidget />
    </ThemeProvider>
  );
}
