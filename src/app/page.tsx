import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <Dashboard />
      <Footer />
    </ThemeProvider>
  );
}
