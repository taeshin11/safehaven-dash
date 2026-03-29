export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="mb-3 h-4 w-24 rounded bg-[#EEF1F6] dark:bg-[#334155]" />
      <div className="mb-2 h-8 w-32 rounded bg-[#EEF1F6] dark:bg-[#334155]" />
      <div className="mb-4 h-4 w-20 rounded bg-[#EEF1F6] dark:bg-[#334155]" />
      <div className="h-16 w-full rounded bg-[#EEF1F6] dark:bg-[#334155]" />
    </div>
  );
}

export function SkeletonGauge() {
  return (
    <div className="animate-pulse rounded-2xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1E293B] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="mx-auto mb-4 h-6 w-48 rounded bg-[#EEF1F6] dark:bg-[#334155]" />
      <div className="mx-auto h-40 w-40 rounded-full bg-[#EEF1F6] dark:bg-[#334155]" />
      <div className="mx-auto mt-4 h-4 w-64 rounded bg-[#EEF1F6] dark:bg-[#334155]" />
    </div>
  );
}
