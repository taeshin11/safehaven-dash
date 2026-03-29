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
    loaded.current = true;

    const el = containerRef.current;

    if (type === 'banner') {
      // Desktop banner (728x90) — hidden on mobile
      const desktopWrapper = document.createElement('div');
      desktopWrapper.className = 'hidden sm:block';
      const desktopScript1 = document.createElement('script');
      desktopScript1.textContent = `atOptions = { 'key': 'f985593859378f2f01d535d7e9c28751', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {} };`;
      const desktopScript2 = document.createElement('script');
      desktopScript2.src = 'https://www.highperformanceformat.com/f985593859378f2f01d535d7e9c28751/invoke.js';
      desktopScript2.async = true;
      desktopWrapper.appendChild(desktopScript1);
      desktopWrapper.appendChild(desktopScript2);

      // Mobile banner (320x50) — hidden on desktop
      const mobileWrapper = document.createElement('div');
      mobileWrapper.className = 'sm:hidden';
      const mobileScript1 = document.createElement('script');
      mobileScript1.textContent = `atOptions = { 'key': '8d8cc6bfda7b1fd7b38162de3721a861', 'format': 'iframe', 'height': 50, 'width': 320, 'params': {} };`;
      const mobileScript2 = document.createElement('script');
      mobileScript2.src = 'https://www.highperformanceformat.com/8d8cc6bfda7b1fd7b38162de3721a861/invoke.js';
      mobileScript2.async = true;
      mobileWrapper.appendChild(mobileScript1);
      mobileWrapper.appendChild(mobileScript2);

      el.appendChild(desktopWrapper);
      el.appendChild(mobileWrapper);
    }

    if (type === 'native') {
      // Native ad between sections
      const container = document.createElement('div');
      container.id = 'container-98bd9fc9a085f3a99ed588a9156418e2';
      const script = document.createElement('script');
      script.src = 'https://pl29009361.profitablecpmratenetwork.com/98bd9fc9a085f3a99ed588a9156418e2/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      el.appendChild(container);
      el.appendChild(script);
    }

    if (type === 'social-bar') {
      // Social bar — floating push notification style
      const script = document.createElement('script');
      script.src = 'https://pl29009362.profitablecpmratenetwork.com/e7/d2/c2/e7d2c2c42c642f82173c247ae4d5e559.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      el.appendChild(script);
    }
  }, [type]);

  // Social bar is floating — no visible container
  if (type === 'social-bar') {
    return <div ref={containerRef} className="hidden" />;
  }

  return (
    <div className={className}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-[#94A3B8]">
        Advertisement
      </p>
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
