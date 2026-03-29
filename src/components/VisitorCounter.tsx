'use client';

import { useEffect, useState } from 'react';

interface VisitorData {
  today: number;
  total: number;
}

export function VisitorCounter() {
  const [data, setData] = useState<VisitorData | null>(null);

  useEffect(() => {
    const visited = sessionStorage.getItem('sh_visited');

    if (!visited) {
      // First visit this session — increment
      fetch('/api/visitors', { method: 'POST' })
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
      sessionStorage.setItem('sh_visited', '1');
    } else {
      // Already visited — just read
      fetch('/api/visitors')
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    }
  }, []);

  if (!data) return null;

  return (
    <p className="mt-2 text-xs text-[#94A3B8] dark:text-[#64748B]">
      Today: {data.today.toLocaleString()} &middot; Total: {data.total.toLocaleString()}
    </p>
  );
}
