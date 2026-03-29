'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  type: 'banner' | 'native' | 'social-bar';
  className?: string;
}

export function AdSlot({ type, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;

    const keys: Record<string, string | undefined> = {
      banner: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY,
      native: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY,
      'social-bar': process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY,
    };

    const key = keys[type];
    if (!key) return; // No key configured yet

    const script = document.createElement('script');
    script.src = `//www.highperformanceformat.com/${key}/invoke.js`;
    script.async = true;

    const container = document.createElement('div');
    container.id = `container-${key}`;

    containerRef.current.appendChild(container);
    containerRef.current.appendChild(script);
    loaded.current = true;
  }, [type]);

  // Don't render anything if no keys are set (development/pre-approval)
  const hasKey = type === 'banner'
    ? process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY
    : type === 'native'
      ? process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY
      : process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY;

  if (!hasKey) {
    // Placeholder in development
    return (
      <div className={`${className}`}>
        {/* ADSTERRA: replace with your ${type} ad unit code after dashboard approval */}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-[#94A3B8]">
        Advertisement
      </p>
      <div ref={containerRef} />
    </div>
  );
}
