'use client';

import { useState, useEffect, useRef } from 'react';
import { useDict } from '@/i18n/DictionaryProvider';

type FeedbackType = 'suggestion' | 'bug' | 'love';

export function FeedbackWidget() {
  const { dict } = useDict();
  const t = dict.feedbackWidget ?? {};

  const FEEDBACK_TYPES: { type: FeedbackType; emoji: string; label: string }[] = [
    { type: 'suggestion', emoji: '\u{1F4A1}', label: t.suggestion ?? 'Suggestion' },
    { type: 'bug', emoji: '\u{1F41B}', label: t.bug ?? 'Bug' },
    { type: 'love', emoji: '\u{2764}\u{FE0F}', label: t.loveIt ?? 'Love it!' },
  ];
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Gentle pulse animation after 20s on first visit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('sh_feedback_seen');
    if (seen) return;
    const timer = setTimeout(() => {
      setPulse(true);
      sessionStorage.setItem('sh_feedback_seen', '1');
      setTimeout(() => setPulse(false), 4000);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            feedback_type: feedbackType,
            message: message.trim(),
            email: email.trim() || 'anonymous',
            user_agent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setSent(true);
      setMessage('');
      setEmail('');
      setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 3000);
    } catch {
      // Fallback: open email
      const subject = encodeURIComponent(`SafeHaven Feedback [${feedbackType}]`);
      const body = encodeURIComponent(message.trim());
      window.open(`mailto:taeshinkim11@gmail.com?subject=${subject}&body=${body}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="w-80 rounded-2xl border border-black/5 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#1E293B] animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#1E293B] dark:text-[#F1F5F9]">
              {sent ? (t.thankYou ?? 'Thank you!') : (t.sendFeedback ?? 'Send Feedback')}
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

          {sent ? (
            <div className="mt-4 text-center py-4">
              <div className="text-3xl mb-2">{'\u2705'}</div>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                {t.sentSuccess ?? 'Your feedback was sent successfully. We appreciate it!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3">
              {/* Feedback type selector */}
              <div className="flex gap-2">
                {FEEDBACK_TYPES.map((ft) => (
                  <button
                    key={ft.type}
                    type="button"
                    onClick={() => setFeedbackType(ft.type)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all ${
                      feedbackType === ft.type
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:hover:bg-[#1E293B]'
                    }`}
                  >
                    {ft.emoji} {ft.label}
                  </button>
                ))}
              </div>

              {/* Message textarea */}
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  feedbackType === 'suggestion'
                    ? (t.placeholderSuggestion ?? 'What would you like to see improved?')
                    : feedbackType === 'bug'
                      ? (t.placeholderBug ?? 'What went wrong? Please describe the issue.')
                      : (t.placeholderLove ?? 'What do you love about SafeHaven Dash?')
                }
                required
                rows={3}
                className="mt-3 w-full rounded-xl border border-black/10 bg-[#F8F9FB] px-3 py-2 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:border-white/10 dark:bg-[#0F172A] dark:text-[#F1F5F9]"
              />

              {/* Optional email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder ?? 'Email (optional, for follow-up)'}
                className="mt-2 w-full rounded-xl border border-black/10 bg-[#F8F9FB] px-3 py-2 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:border-white/10 dark:bg-[#0F172A] dark:text-[#F1F5F9]"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.sending ?? 'Sending...'}
                  </span>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    {t.sendButton ?? 'Send Feedback'}
                  </>
                )}
              </button>

              <div className="mt-2 text-center">
                <a
                  href="mailto:taeshinkim11@gmail.com?subject=SafeHaven Dash Feedback"
                  className="text-[10px] text-[#94A3B8] hover:text-[#2563EB] transition-colors"
                >
                  {t.emailDirect ?? 'or email us directly at taeshinkim11@gmail.com'}
                </a>
              </div>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => {
          setOpen(!open);
          setPulse(false);
        }}
        aria-label="Send feedback"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg transition-all duration-200 hover:bg-[#1d4ed8] hover:scale-110 hover:shadow-xl ${
          pulse ? 'animate-bounce' : ''
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
