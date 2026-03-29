import { ThemeProvider } from '@/components/ThemeProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
      <Footer />
    </ThemeProvider>
  );
}
