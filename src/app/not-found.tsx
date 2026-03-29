import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FB] px-4 dark:bg-[#0F172A]">
      <h1 className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">
        404
      </h1>
      <p className="mt-4 text-lg text-[#64748B] dark:text-[#94A3B8]">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] hover:scale-[1.02]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
