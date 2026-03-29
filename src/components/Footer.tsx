export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-8 dark:border-white/10 dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            <p className="font-medium">SafeHaven Dash</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed">
              Data is provided for informational purposes only and should not be considered financial
              advice. Prices may be delayed. Always do your own research before making investment
              decisions.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <div className="flex gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <a href="#methodology" className="transition-colors hover:text-[#2563EB]">
                Methodology
              </a>
              <a href="#privacy" className="transition-colors hover:text-[#2563EB]">
                Privacy
              </a>
            </div>
            <p className="text-xs text-[#94A3B8] dark:text-[#64748B]">
              &copy; {new Date().getFullYear()} SafeHaven Dash. All rights reserved.
            </p>
            {/* Visitor counter will go here (F7) */}
          </div>
        </div>
      </div>
    </footer>
  );
}
