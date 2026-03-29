import { ThemeProvider } from '@/components/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      {/* H1 in server component for SEO crawlability */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <h1 className="mb-8 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9] sm:mb-12 sm:text-4xl">
          Safe Haven Currency &amp; Gold Tracker
        </h1>
      </div>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
      <Footer />
    </ThemeProvider>
  );
}
