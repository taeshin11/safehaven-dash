'use client';

import { useState } from 'react';

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="w-72 rounded-2xl border border-black/5 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#1E293B]">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#1E293B] dark:text-[#F1F5F9]">
              Send Feedback
            </h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close feedback"
              className="text-[#94A3B8] transition-colors hover:text-[#1E293B] dark:hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
            Have a suggestion or found an issue? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:taeshinkim11@gmail.com?subject=SafeHaven Dash Feedback&body=Hi, I'd like to suggest:%0A%0A"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            Email Feedback
          </a>
          <p className="mt-2 text-[10px] text-center text-[#94A3B8]">
            taeshinkim11@gmail.com
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Send feedback"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg transition-all duration-200 hover:bg-[#1d4ed8] hover:scale-110 hover:shadow-xl"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}
