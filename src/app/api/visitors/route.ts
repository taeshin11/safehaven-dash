import { NextResponse } from 'next/server';

// In-memory store (persists during Vercel function lifecycle)
// For production with persistence, use Vercel KV or Supabase
const store: { total: number; daily: Record<string, number> } = {
  total: 0,
  daily: {},
};

const NO_CACHE = { 'Cache-Control': 'no-cache, no-store, must-revalidate' };

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export async function GET() {
  try {
    const today = getToday();
    return NextResponse.json(
      { today: store.daily[today] || 0, total: store.total },
      { headers: NO_CACHE },
    );
  } catch (error) {
    console.error('Visitor counter GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const today = getToday();
    store.total += 1;
    store.daily[today] = (store.daily[today] || 0) + 1;

    return NextResponse.json(
      { today: store.daily[today], total: store.total },
      { headers: NO_CACHE },
    );
  } catch (error) {
    console.error('Visitor counter POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
