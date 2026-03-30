'use client';

import { useState } from 'react';

const SITE_URL = 'https://safehaven-dash.vercel.app';

export default function ShareButtons({ score, label }: { score: number; label: string }) {
  const [copied, setCopied] = useState(false);

  const text = `Market Fear Gauge: ${score}/100 (${label}) — Track gold, USD, CHF, JPY in real-time`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(SITE_URL);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SafeHaven Dash — Fear Gauge', text, url: SITE_URL });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${SITE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Share:</span>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Reddit */}
      <a
        href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Reddit"
        className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.995 13.985c.04.218.06.441.06.665 0 3.39-3.946 6.14-8.815 6.14S.425 18.04.425 14.65c0-.224.02-.447.06-.665a1.994 1.994 0 01-.97-1.715 2 2 0 013.415-1.415c1.373-.932 3.267-1.537 5.385-1.615l1.02-4.783a.4.4 0 01.477-.318l3.39.715a1.4 1.4 0 012.634.846 1.398 1.398 0 01-1.39 1.398 1.4 1.4 0 01-1.378-1.17l-2.936-.617-.898 4.217c2.087.092 3.948.698 5.3 1.62a2 2 0 013.415 1.415c0 .704-.363 1.323-.914 1.68zM8.85 13.25a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zm6.3 0a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zm-5.535 4.36c-.098-.098-.098-.256 0-.354a.252.252 0 01.354 0 3.427 3.427 0 004.062 0 .252.252 0 01.354 0c.098.098.098.256 0 .354a3.932 3.932 0 01-4.77 0z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Copy / Native Share */}
      <button
        onClick={handleShare}
        aria-label="Copy link or share"
        className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
      </button>
    </div>
  );
}
