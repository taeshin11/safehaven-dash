'use client';

import { useEffect, useState } from 'react';
import { useDict } from '@/i18n/DictionaryProvider';

interface VisitorData {
  today: number;
  total: number;
}

export function VisitorCounter() {
  const { dict } = useDict();
  const tf = dict.footer ?? {};
  const [data, setData] = useState<VisitorData | null>(null);

  useEffect(() => {
    const visited = sessionStorage.getItem('sh_visited');

    if (!visited) {
      // First visit this session — increment
      fetch('/api/visitors', { method: 'POST' })
        .then((r) => r.json())
        .then(setData)
        .catch((err) => console.warn('Visitor counter failed:', err));
      sessionStorage.setItem('sh_visited', '1');
    } else {
      // Already visited — just read
      fetch('/api/visitors')
        .then((r) => r.json())
        .then(setData)
        .catch((err) => console.warn('Visitor counter failed:', err));
    }
  }, []);

  if (!data) return null;

  return (
    <p className="mt-2 text-xs text-[#94A3B8] dark:text-[#64748B]">
      {tf.today ?? 'Today'}: {data.today.toLocaleString()} &middot; {tf.total ?? 'Total'}: {data.total.toLocaleString()}
    </p>
  );
}
