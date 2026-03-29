import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeedbackWidget } from '@/components/FeedbackWidget';

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="flex-1 bg-[#F8F9FB] dark:bg-[#0F172A]">{children}</main>
      <Footer />
      <FeedbackWidget />
    </ThemeProvider>
  );
}
