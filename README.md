# SafeHaven Dash

> Real-time Gold & Safe-Haven Currency Dashboard with Fear Gauge Index

**Live Demo:** [safehaven-dash.vercel.app](https://safehaven-dash.vercel.app) | [Short Link](https://tinyurl.com/22b5bx3j)

## Overview

SafeHaven Dash is a free, ad-supported, single-page dashboard that tracks safe-haven assets (Gold, USD Index, CHF, JPY) and computes a custom "Fear Gauge" index (0-100) so anyone can see safe-haven momentum at a glance.

## Features

- **Live Asset Prices** — Gold (XAU/USD), USD Index (DXY), USD/CHF, USD/JPY with 7-day sparklines
- **Fear Gauge Index** — Animated gauge (0-100) computed from weighted asset movements
- **Dark Mode** — Full dark/light theme with system preference detection
- **Interactive Calculator** — "Calculate Your Fear Score" with Google Sheets data collection
- **Responsive Design** — Mobile-first, works from 320px to 4K
- **SEO Optimized** — Meta tags, JSON-LD, sitemap, Open Graph images

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Data Fetching | SWR (client) + server-side caching |
| Hosting | Vercel (free tier) |
| APIs | Frankfurter API (FX rates), fawazahmed0 (Gold) |
| Persistence | Upstash Redis (visitor counter, free tier) |
| Ads | Adsterra (banner, native, social bar) |

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── prices/          # Asset price API with multi-provider fallback
│   │   ├── fear-gauge/      # Fear Gauge computation
│   │   └── visitors/        # Visitor counter
│   ├── layout.tsx           # Root layout with SEO metadata + JSON-LD
│   ├── page.tsx             # Main dashboard page
│   ├── sitemap.ts           # Auto-generated sitemap
│   ├── robots.ts            # Robots.txt
│   ├── not-found.tsx        # Custom 404 page
│   └── opengraph-image.tsx  # Dynamic OG image (1200x630)
├── components/
│   ├── Dashboard.tsx        # Main dashboard orchestrator
│   ├── FearGauge.tsx        # Animated SVG gauge (0-100)
│   ├── AssetCard.tsx        # Price card with Recharts sparkline
│   ├── CalculateFearScore.tsx # Interactive fear score calculator
│   ├── Header.tsx           # Sticky header + dark mode toggle
│   ├── Footer.tsx           # Footer + visitor count
│   ├── AdSlot.tsx           # Adsterra ad integration
│   ├── Methodology.tsx      # Fear Gauge methodology accordion
│   ├── ThemeProvider.tsx     # Dark mode context
│   ├── ErrorBoundary.tsx    # Error boundary
│   └── SkeletonCard.tsx     # Loading skeletons
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── cache.ts             # In-memory API cache (5-min TTL)
│   └── constants.ts         # Fear Gauge weights, thresholds, colors
└── scripts/
    └── apps-script/         # Google Apps Script for Sheets webhook
```

## Setup

```bash
git clone https://github.com/taeshin11/safehaven-dash.git
cd safehaven-dash
npm install && npm run dev
```

## Environment Variables

```env
# Optional — Google Sheets webhook
NEXT_PUBLIC_SHEETS_WEBHOOK_URL=

# Optional — Adsterra ad keys
NEXT_PUBLIC_ADSTERRA_BANNER_KEY=
NEXT_PUBLIC_ADSTERRA_NATIVE_KEY=
NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY=

# Visitor counter persistence (Upstash Redis via Vercel KV)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

## Ad Integration Guide

1. **Adsterra** (primary) — Sign up at adsterra.com, create ad units, add keys to env vars
2. **Google AdSense** (secondary) — Higher CPMs long-term but slower approval
3. **Carbon Ads** (tertiary) — Developer audience alternative

## Fear Gauge Formula

```
fear_score = 0.35 * gold_24h_change%
           + 0.25 * dxy_24h_change%
           + 0.20 * chf_strength%
           + 0.20 * jpy_strength%

Normalized to 0-100: Calm (0-30) | Cautious (31-60) | Fear (61-100)
```

## Deployment

```bash
vercel --prod
```

## License

MIT
