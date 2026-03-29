import { NextResponse } from 'next/server';

// In-memory store (persists during Vercel function lifecycle)
// For production with persistence, use Vercel KV or Supabase
const store: { total: number; daily: Record<string, number> } = {
  total: 0,
  daily: {},
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export async function GET() {
  const today = getToday();
  return NextResponse.json({
    today: store.daily[today] || 0,
    total: store.total,
  });
}

export async function POST() {
  const today = getToday();
  store.total += 1;
  store.daily[today] = (store.daily[today] || 0) + 1;

  return NextResponse.json({
    today: store.daily[today],
    total: store.total,
  });
}
