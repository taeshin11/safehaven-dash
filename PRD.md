# PRD: SafeHaven Dash — Gold & Safe-Haven Currency Real-Time Dashboard

> **Service Name:** SafeHaven Dash  
> **Short Title:** Gold & USD Index  
> **One-liner:** A zero-cost, real-time dashboard that tracks gold, USD, CHF, JPY and computes a custom "Fear Gauge" index so anyone can see safe-haven momentum at a glance.

---

## 0. How Claude Code Must Work (Harness Protocol)

This section is **non-negotiable**. Claude Code must follow this harness structure for every session.

### 0.1 File Bootstrap (Initializer Agent)

On the **very first session**, create these files before writing any application code:

| File | Purpose |
|---|---|
| `feature_list.json` | Ordered array of every feature with `id`, `title`, `status` (`todo` / `in-progress` / `done`), `priority` (1-5), and `acceptance_criteria[]`. |
| `claude-progress.txt` | Human-readable log — append a timestamped line every time a feature starts, passes tests, or is committed. |
| `init.sh` | Single command to install deps + start dev server (`npm install && npm run dev`). Must work from a clean clone. |

### 0.2 Session Start Routine (every session)

```
1. Read claude-progress.txt  →  understand current state
2. Read feature_list.json    →  pick the next `todo` item by priority
3. Run tests (if any exist)  →  confirm nothing is broken
4. Implement ONE feature     →  write code + tests
5. Run tests again           →  green? continue. red? fix before moving on
6. Git commit with conventional commit message (feat: / fix: / chore:)
7. Update feature_list.json  →  mark feature `done`
8. Append to claude-progress.txt
9. If milestone reached      →  `git push`
10. Loop to step 2
```

### 0.3 Builder ↔ Reviewer Separation

After completing each feature:
- **Builder pass**: implement feature.
- **Reviewer pass**: re-read the code as if you are a senior QA engineer. Check for a11y, responsiveness, edge cases, performance. Fix issues before committing.

### 0.4 Git & GitHub Rules

```bash
# FIRST SESSION — create the repo via CLI
gh repo create safehaven-dash --public --source=. --remote=origin --push

# Milestone push triggers (MUST push at each):
#   M1  Project scaffold + deploy pipeline live
#   M2  Core dashboard with live data rendering
#   M3  Fear Gauge index working
#   M4  Google Sheets webhook integration complete
#   M5  Ad integration (Adsterra) live
#   M6  Visitor counter working
#   M7  SEO + responsive polish pass
#   M8  Final production deploy on Vercel
```

### 0.5 Automation-First Rule

**If a problem can be solved via CLI, solve it via CLI. No manual steps. No "guide the user" — just do it.**

Examples: Vercel deploy (`npx vercel --prod`), DNS config, Google Apps Script deploy (`clasp push`), dependency install, linting, image optimization — automate everything.

---

## 1. Product Overview

### 1.1 Problem

Retail investors and macro-watchers need a single view of safe-haven assets (Gold, USD Index, CHF, JPY, Treasury yields) — especially during crises. Existing tools are cluttered, paywalled, or lack a simple "how scared is the market?" gauge.

### 1.2 Solution

SafeHaven Dash is a **free, ad-supported, single-page responsive web dashboard** that:

1. Pulls real-time / near-real-time prices for Gold (XAU/USD), DXY (USD Index), USD/CHF, USD/JPY.
2. Computes a proprietary **"Fear Gauge"** (0-100) from weighted asset moves and displays it as an animated gauge chart.
3. Shows sparkline / mini-charts for each asset's 7-day trend.
4. Costs **$0/month** to operate (free APIs, free hosting, free analytics).
5. Monetizes via **Adsterra ads** from day one for fast revenue.

### 1.3 Target Audience

- Retail FX / commodity traders
- Macro-economy enthusiasts
- Financial bloggers who embed widgets
- Anyone googling "gold price today", "dollar index live", "safe haven tracker"

---

## 2. Tech Stack (Zero-Cost Mandate)

| Layer | Choice | Cost |
|---|---|---|
| Framework | **Next.js 14 (App Router)** — SSR for SEO, static where possible | Free |
| Hosting | **Vercel** (Hobby plan) — auto-deploy from GitHub | Free |
| Styling | **Tailwind CSS** | Free |
| Charts | **Lightweight Charts (TradingView)** or **Chart.js** for gauge + sparklines | Free |
| FX/Gold API | **ExchangeRate-API** (free tier 1500 req/mo) + **GoldAPI.io** (free tier) or **Frankfurter API** (unlimited, ECB data) + **Metal.dev** free tier. Fallback: scrape Yahoo Finance via `yahoo-finance2` npm | Free |
| Fear Gauge API | Self-computed on server from asset deltas — no external cost | Free |
| Data collection | **Google Sheets** via **Apps Script** webhook (POST) | Free |
| Visitor counter | **CountAPI** or self-built with **Vercel KV (free tier)** / Supabase free row-level | Free |
| Ads | **Adsterra** (banner + native ads) — faster approval & payout vs AdSense | Free to integrate |
| Analytics | **Vercel Analytics** (free tier) or **Umami** (self-host free) | Free |
| Domain redirect | **Short link** via free service (e.g., `dub.co` or `rebrandly`) to hide GitHub username | Free |
| CI/CD | GitHub Actions (free for public repos) | Free |

> **Cost ceiling: $0/month.** If any dependency requires payment, find a free alternative or implement it yourself.

---

## 3. Feature Specifications

### F1 — Project Scaffold & CI/CD Pipeline ▸ Milestone 1

- **ID:** `F1`
- **Priority:** 1
- **Acceptance Criteria:**
  - [ ] Next.js 14 app created with App Router, Tailwind CSS configured
  - [ ] ESLint + Prettier configured
  - [ ] `init.sh` works from clean clone
  - [ ] GitHub repo created via `gh repo create safehaven-dash --public`
  - [ ] Vercel project linked and auto-deploys on push to `main`
  - [ ] Deploy via CLI: `npx vercel --prod` — not a manual guide
  - [ ] Create free short-link (dub.co / rebrandly) pointing to Vercel URL — do NOT expose GitHub username

### F2 — Responsive Layout Shell ▸ Milestone 2

- **ID:** `F2`
- **Priority:** 1
- **Acceptance Criteria:**
  - [ ] Mobile-first responsive grid (works on 320px – 2560px)
  - [ ] Soft, calming background palette:
    - Primary BG: `#F8F9FB` (soft cool white)
    - Card BG: `#FFFFFF` with subtle shadow
    - Accent: `#2563EB` (trust blue) + `#D4AF37` (gold)
    - Dark mode toggle with equally soft dark palette (`#0F172A` base)
  - [ ] Modern, comfortable UI/UX:
    - Generous whitespace, rounded corners (12-16px), smooth hover transitions
    - Typography: clean sans-serif (e.g., DM Sans for headings, Satoshi or Plus Jakarta Sans for body)
    - Micro-interactions on hover/click (subtle scale, color shift)
    - Skeleton loaders while data fetches
  - [ ] Sticky header with logo + dark mode toggle
  - [ ] Footer with disclaimer, links, copyright

### F3 — Live Asset Price Cards ▸ Milestone 2

- **ID:** `F3`
- **Priority:** 1
- **Acceptance Criteria:**
  - [ ] Cards for: Gold (XAU/USD), USD Index (DXY), USD/CHF, USD/JPY
  - [ ] Each card shows: asset name, current price, 24h change (% + absolute), mini sparkline (7 days)
  - [ ] Data fetched server-side (API route) and cached (ISR or SWR) — respect free-tier rate limits
  - [ ] Graceful fallback if API is down: show last cached value + "delayed" badge
  - [ ] Auto-refresh every 60 seconds (client-side SWR revalidation)

### F4 — Fear Gauge Index ▸ Milestone 3

- **ID:** `F4`
- **Priority:** 1
- **Acceptance Criteria:**
  - [ ] Custom "SafeHaven Fear Gauge" (0-100):
    - 0-30 = Calm (green)
    - 31-60 = Cautious (amber)
    - 61-100 = Fear (red)
  - [ ] Formula (server-computed):
    ```
    fear_score = w1 * gold_24h_pct_change
              + w2 * dxy_24h_pct_change
              + w3 * chf_strength
              + w4 * jpy_strength
    // Normalize to 0-100 range
    // Weights: gold=0.35, dxy=0.25, chf=0.20, jpy=0.20
    ```
  - [ ] Rendered as animated **gauge / speedometer chart** (Canvas or SVG)
  - [ ] Tooltip explains the methodology
  - [ ] Prominent position: top of dashboard, full-width on mobile

### F5 — Google Sheets Data Collection ▸ Milestone 4

- **ID:** `F5`
- **Priority:** 2
- **Acceptance Criteria:**
  - [ ] Google Apps Script deployed as web app (doPost endpoint)
  - [ ] Apps Script code created and deployed via CLI (`clasp create`, `clasp push`, `clasp deploy`) — NOT a manual guide
  - [ ] When user clicks **"Calculate My Fear Score"** button (a simple interactive widget: user picks assets they hold), the form data + computed score + timestamp are POSTed to the Sheets webhook automatically
  - [ ] No authentication required for the user
  - [ ] Success/error toast notification after POST
  - [ ] Sheet columns: `timestamp`, `assets_selected`, `fear_score`, `user_agent`, `referrer`
  - [ ] Privacy notice displayed before submission ("We collect anonymous usage data to improve the service")

### F6 — Adsterra Ad Integration ▸ Milestone 5

- **ID:** `F6`
- **Priority:** 2
- **Acceptance Criteria:**
  - [ ] Adsterra account registered and ad units created:
    - **Banner ad** (728x90 desktop / 320x50 mobile) — below header or between sections
    - **Native ad** unit — within content flow (between asset cards and Fear Gauge)
    - **Social bar** (push notification style) — Adsterra's highest eCPM format
  - [ ] Ad placements do NOT disrupt UX:
    - Ads must not overlap content
    - Ads must not appear above the fold on mobile (first viewport = pure content)
    - Clearly labeled "Advertisement"
  - [ ] Code includes placeholder `<div>` with comment `<!-- ADSTERRA: replace with your ad unit code after dashboard approval -->` and clear instructions for key insertion
  - [ ] Adsterra script loaded asynchronously, does not block page render
  - [ ] Fallback: if Adsterra does not approve quickly, also prepare slots for **Google AdSense** (secondary) and **Carbon Ads** (dev-audience alternative)
  - [ ] Revenue strategy note in README:
    - Adsterra first (fastest approval, best for global traffic)
    - Google AdSense second (higher long-term CPM)
    - Affiliate links to gold/forex brokers (sidebar widget)

### F7 — Visitor Counter ▸ Milestone 6

- **ID:** `F7`
- **Priority:** 3
- **Acceptance Criteria:**
  - [ ] Track **today's visitors** and **total visitors**
  - [ ] Implementation: Vercel KV (free tier) or Supabase free-tier (row counting) or CountAPI
  - [ ] Display location: **footer area** — small, subtle, does not distract from main content
  - [ ] Format: "👁 Today: 142 | Total: 12,847" — subtle gray text
  - [ ] Increment on page load (deduplicate by session cookie, not IP)
  - [ ] Server-side API route `/api/visitors` handles GET (read) and POST (increment)

### F8 — SEO & Performance Optimization ▸ Milestone 7

- **ID:** `F8`
- **Priority:** 2
- **Acceptance Criteria:**
  - [ ] **Meta tags**: title, description, og:image, twitter:card for every page
  - [ ] **Target keywords** (in title, H1, meta):
    - "gold price today"
    - "safe haven tracker"
    - "dollar index live"
    - "fear gauge market"
    - "USD CHF JPY gold dashboard"
  - [ ] **Structured data** (JSON-LD): `FinancialProduct` or `WebApplication` schema
  - [ ] **Sitemap.xml** auto-generated
  - [ ] **robots.txt** properly configured
  - [ ] **Performance**:
    - Lighthouse score ≥ 90 on all 4 categories
    - Largest Contentful Paint < 2.5s
    - No layout shift (CLS < 0.1)
  - [ ] **Canonical URL** set
  - [ ] **Alt text** on all images/charts
  - [ ] **H1-H3** hierarchy correct and keyword-rich
  - [ ] Open Graph image auto-generated or static (1200x630)

### F9 — Final Polish & Production Deploy ▸ Milestone 8

- **ID:** `F9`
- **Priority:** 1
- **Acceptance Criteria:**
  - [ ] All features F1-F8 pass acceptance criteria
  - [ ] Full responsive test: iPhone SE, iPhone 14, iPad, 1440p desktop, 4K
  - [ ] Dark mode fully styled
  - [ ] Error boundaries on all data-fetching components
  - [ ] 404 page styled
  - [ ] Loading states for every async operation
  - [ ] `npx vercel --prod` deploy successful
  - [ ] Short-link resolves to production URL
  - [ ] README.md includes: project description, live demo link, setup instructions, architecture diagram, ad integration guide

---

## 4. API Strategy (Zero-Cost)

### Primary APIs

| Data Point | API | Free Tier Limit | Fallback |
|---|---|---|---|
| Gold (XAU/USD) | [Frankfurter API](https://frankfurter.app) or [Metal.dev](https://metal.dev) | Unlimited / 1000 req/mo | Yahoo Finance via `yahoo-finance2` |
| USD Index (DXY) | Computed from EUR/USD, GBP/USD, JPY, CHF, CAD, SEK basket | N/A (self-compute) | Alpha Vantage free tier (25 req/day) |
| USD/CHF, USD/JPY | [ExchangeRate-API](https://exchangerate-api.com) | 1500 req/mo | [Open Exchange Rates](https://openexchangerates.org) (1000 req/mo) |
| Historical (7d) | Cache daily closes in Vercel KV / JSON file | — | — |

### Rate Limit Strategy

- Server-side caching: cache responses for **5 minutes** minimum
- ISR (Incremental Static Regeneration): revalidate every 300s
- Client-side SWR: `refreshInterval: 60000` (visual refresh every 60s, API hit only on cache miss)
- Daily budget: ~288 requests/day if refreshing every 5 min → well within free tier

---

## 5. Design System

### Color Palette

```
Light Mode:
  --bg-primary:    #F8F9FB   (soft cool white)
  --bg-secondary:  #EEF1F6   (light gray-blue)
  --bg-card:       #FFFFFF
  --text-primary:  #1E293B   (slate 800)
  --text-secondary:#64748B   (slate 500)
  --accent-blue:   #2563EB
  --accent-gold:   #D4AF37
  --fear-calm:     #22C55E   (green)
  --fear-caution:  #F59E0B   (amber)
  --fear-fear:     #EF4444   (red)
  --shadow-card:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)

Dark Mode:
  --bg-primary:    #0F172A   (slate 900)
  --bg-secondary:  #1E293B   (slate 800)
  --bg-card:       #1E293B
  --text-primary:  #F1F5F9   (slate 100)
  --text-secondary:#94A3B8   (slate 400)
  --shadow-card:   0 1px 3px rgba(0,0,0,0.3)
```

### Typography

- **Headings:** `DM Sans` (700, 600) — clean, modern, geometric
- **Body:** `Plus Jakarta Sans` (400, 500) — readable, friendly
- **Monospace (prices):** `JetBrains Mono` — clear number rendering
- Load via Google Fonts `<link>` (free, CDN-cached)

### Component Style

- Border radius: `12px` (cards), `8px` (buttons), `9999px` (pills/badges)
- Transitions: `all 0.2s ease` on interactive elements
- Hover states: subtle scale (`transform: scale(1.02)`) + shadow lift
- Skeleton loaders: pulsing `bg-secondary` blocks matching content shape

### Layout

- Max content width: `1280px`, centered
- Grid: CSS Grid, 12-column on desktop → 1 column on mobile
- Card gap: `24px` desktop, `16px` mobile
- Section padding: `48px 0` desktop, `32px 0` mobile

---

## 6. Page Structure

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
│  Logo | "SafeHaven Dash" | Dark Toggle  │
├─────────────────────────────────────────┤
│  FEAR GAUGE (hero section)              │
│  ┌───────────────────────────────────┐  │
│  │  Animated Gauge (0-100)           │  │
│  │  Label: "Market Fear Level"       │  │
│  │  Subtext: "Based on gold, USD,    │  │
│  │           CHF, JPY movements"     │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  [ADSTERRA NATIVE AD — between sections]│
├─────────────────────────────────────────┤
│  ASSET CARDS (2x2 grid desktop,         │
│               1-col mobile)             │
│  ┌──────────┐  ┌──────────┐            │
│  │ Gold/USD │  │ DXY      │            │
│  │ $2,347   │  │ 104.2    │            │
│  │ +1.2%  ▲ │  │ -0.3%  ▼ │            │
│  │ ~spark~  │  │ ~spark~  │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │ USD/CHF  │  │ USD/JPY  │            │
│  └──────────┘  └──────────┘            │
├─────────────────────────────────────────┤
│  INTERACTIVE SECTION                    │
│  "Calculate Your Fear Score"            │
│  [Checkbox: assets you hold]            │
│  [Button: "Calculate"] → POST to Sheets │
├─────────────────────────────────────────┤
│  [ADSTERRA BANNER AD — 728x90/320x50]  │
├─────────────────────────────────────────┤
│  METHODOLOGY                            │
│  Accordion: How the Fear Gauge works    │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  Disclaimer | Privacy | © 2025          │
│  👁 Today: 142 | Total: 12,847         │
│  [ADSTERRA SOCIAL BAR — floating]       │
└─────────────────────────────────────────┘
```

---

## 7. Google Sheets Webhook (Apps Script)

### Apps Script Code (deploy via `clasp` CLI)

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date().toISOString(),
    data.assets_selected.join(', '),
    data.fear_score,
    data.user_agent || '',
    data.referrer || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Automation Steps (Claude Code must execute these, not just document)

```bash
# 1. Install clasp globally
npm install -g @google/clasp

# 2. Login to Google (will open browser — if headless, use service account)
clasp login

# 3. Create a new Apps Script project linked to a Google Sheet
clasp create --type sheets --title "SafeHaven Data Collection"

# 4. Push the code
clasp push

# 5. Deploy as web app
clasp deploy --description "SafeHaven webhook v1"

# 6. Note the deployment URL and add it to .env.local as:
#    NEXT_PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxx/exec
```

> **If `clasp` CLI hits auth issues in headless mode**, fall back to providing a one-time manual setup script with exact steps + screenshots, but always TRY CLI first.

---

## 8. Adsterra Integration

### Setup

1. Sign up at [adsterra.com](https://adsterra.com)
2. Add website, submit for approval
3. Once approved, create ad units:
   - **Banner 728x90** (desktop) / **Banner 320x50** (mobile)
   - **Native Banner** (in-content)
   - **Social Bar** (push-style, highest eCPM)

### Code Integration

```html
<!-- ADSTERRA BANNER — Replace ADSTERRA_BANNER_KEY with your key -->
<script async src="//www.highperformanceformat.com/ADSTERRA_BANNER_KEY/invoke.js"></script>
<div id="container-ADSTERRA_BANNER_KEY"></div>

<!-- ADSTERRA NATIVE AD — Replace ADSTERRA_NATIVE_KEY with your key -->
<script async src="//www.highperformanceformat.com/ADSTERRA_NATIVE_KEY/invoke.js"></script>
<div id="container-ADSTERRA_NATIVE_KEY"></div>

<!-- ADSTERRA SOCIAL BAR — Replace ADSTERRA_SOCIAL_KEY with your key -->
<script async src="//www.highperformanceformat.com/ADSTERRA_SOCIAL_KEY/invoke.js"></script>
```

### Revenue Hierarchy

1. **Adsterra** — primary. Fastest approval, good global CPMs, pays via crypto/PayPal/wire.
2. **Google AdSense** — secondary. Higher CPMs long-term but slower approval.
3. **Carbon Ads** — tertiary. If audience skews developer/tech.
4. **Affiliate links** — sidebar widget linking to gold/forex broker sign-ups (e.g., eToro, OANDA partner programs).

### Ad Placement Rules

- **Never** place ads above the fold on mobile first viewport
- **Never** let ads overlap or obscure content
- **Always** load ad scripts `async` to prevent render blocking
- **Always** label ad areas with subtle "Advertisement" text
- Store all Adsterra keys in environment variables or clearly marked constants for easy swapping

---

## 9. Visitor Counter Specification

### Implementation (Vercel KV or Supabase)

**Option A: Vercel KV (preferred — zero setup)**

```typescript
// /api/visitors/route.ts
import { kv } from '@vercel/kv';

export async function GET() {
  const today = new Date().toISOString().split('T')[0]; // "2025-01-15"
  const todayCount = (await kv.get(`visitors:${today}`)) || 0;
  const totalCount = (await kv.get('visitors:total')) || 0;
  return Response.json({ today: todayCount, total: totalCount });
}

export async function POST() {
  const today = new Date().toISOString().split('T')[0];
  await kv.incr(`visitors:${today}`);
  await kv.incr('visitors:total');
  const todayCount = await kv.get(`visitors:${today}`);
  const totalCount = await kv.get('visitors:total');
  return Response.json({ today: todayCount, total: totalCount });
}
```

**Option B: Supabase (if KV unavailable)**

- Single table: `visitors (id, date, count)`
- RPC function to increment + return counts

### Display

- **Location:** Footer — right side, small text
- **Style:** `text-sm text-slate-400` — does not compete with main content
- **Format:** `👁 Today: {n} · Total: {n}` with `toLocaleString()` formatting
- **Session dedup:** Set a session cookie `sh_visited=1` (expires end of day); only POST increment if cookie absent

---

## 10. SEO Strategy

### Target Keywords (integrate into page content naturally)

| Primary | Secondary |
|---|---|
| gold price today | safe haven assets tracker |
| dollar index live | market fear gauge |
| USD safe haven dashboard | gold vs dollar chart |
| safe haven currency tracker | CHF JPY strength indicator |

### Technical SEO Checklist

- [x] Server-side rendering (Next.js SSR/ISR)
- [ ] `<title>`: "Gold Price & Safe Haven Dashboard | Fear Gauge Live — SafeHaven Dash"
- [ ] `<meta name="description">`: "Track gold, USD index, CHF, JPY in real-time. Free safe-haven dashboard with live Fear Gauge. See if markets are calm or panicking."
- [ ] `<h1>`: "Safe Haven Currency & Gold Tracker"
- [ ] JSON-LD structured data
- [ ] `sitemap.xml` at `/sitemap.xml`
- [ ] `robots.txt` allowing all crawlers
- [ ] Open Graph image (1200x630, auto-generated or static)
- [ ] Canonical URL set
- [ ] All images have descriptive `alt` text
- [ ] Internal linking between sections (anchor links)

---

## 11. Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile S | 320px | 1 column, stacked cards |
| Mobile L | 425px | 1 column, larger touch targets |
| Tablet | 768px | 2-column grid |
| Desktop | 1024px | 2x2 card grid, sidebar ads |
| Wide | 1440px+ | Centered max-width 1280px |

---

## 12. Link & Privacy Strategy

### Hide GitHub Username

- **Do NOT** share the raw `github.com/username/safehaven-dash` link publicly
- Create a redirect via free URL shortener:
  - **Option 1:** [dub.co](https://dub.co) — free tier, custom slugs
  - **Option 2:** [rebrandly.com](https://rebrandly.com) — free tier
- Use the short link as the canonical share link everywhere
- The Vercel deploy URL (e.g., `safehaven-dash.vercel.app`) is the public-facing URL — this is safe to share

### Privacy

- No login required
- No personal data collected except anonymous form submissions
- Privacy notice before Google Sheets POST
- Cookie consent banner (simple, non-intrusive) for ad compliance

---

## 13. Deployment Checklist (Vercel — via CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project (first time)
vercel link

# Environment variables (set via CLI)
vercel env add NEXT_PUBLIC_SHEETS_WEBHOOK_URL
vercel env add NEXT_PUBLIC_ADSTERRA_BANNER_KEY
vercel env add NEXT_PUBLIC_ADSTERRA_NATIVE_KEY
vercel env add NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN

# Deploy to production
vercel --prod

# Verify deployment
curl -I https://safehaven-dash.vercel.app
```

---

## 14. Milestones & Git Push Schedule

| Milestone | Features | Git Push? | Tag |
|---|---|---|---|
| **M1** | F1: Scaffold + Vercel deploy | ✅ YES | `v0.1.0` |
| **M2** | F2 + F3: Layout + Live prices | ✅ YES | `v0.2.0` |
| **M3** | F4: Fear Gauge | ✅ YES | `v0.3.0` |
| **M4** | F5: Google Sheets webhook | ✅ YES | `v0.4.0` |
| **M5** | F6: Adsterra ads | ✅ YES | `v0.5.0` |
| **M6** | F7: Visitor counter | ✅ YES | `v0.6.0` |
| **M7** | F8: SEO + performance | ✅ YES | `v0.7.0` |
| **M8** | F9: Final polish + prod deploy | ✅ YES | `v1.0.0` |

---

## 15. Success Metrics

| Metric | Target (30 days) |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Monthly hosting cost | $0 |
| Adsterra ads serving | Active |
| Google Sheets rows collected | > 100 |
| Total visitors | > 1,000 |
| Page load (LCP) | < 2.5s |
| Mobile usability | 100% (Google Search Console) |

---

## 16. Risk Mitigation

| Risk | Mitigation |
|---|---|
| Free API rate limit exceeded | Multi-provider fallback chain + aggressive caching (5-min TTL) |
| Adsterra rejection | Pre-build AdSense + Carbon Ads slots as backup |
| Vercel free tier limits | Static generation where possible, edge functions for API routes |
| Gold API goes down | Yahoo Finance scraper fallback via `yahoo-finance2` |
| Google Sheets webhook spam | Rate limit client-side (1 submission per session), honeypot field |
| clasp CLI auth failure | Document manual setup as last-resort fallback, but always attempt CLI first |

---

## APPENDIX A: feature_list.json Template

```json
[
  { "id": "F1", "title": "Project Scaffold & CI/CD", "status": "todo", "priority": 1, "milestone": "M1", "acceptance_criteria": ["Next.js app created", "Tailwind configured", "GitHub repo via gh CLI", "Vercel deploy via CLI", "Short link created"] },
  { "id": "F2", "title": "Responsive Layout Shell", "status": "todo", "priority": 1, "milestone": "M2", "acceptance_criteria": ["Mobile-first grid", "Soft color palette", "Dark mode toggle", "Skeleton loaders"] },
  { "id": "F3", "title": "Live Asset Price Cards", "status": "todo", "priority": 1, "milestone": "M2", "acceptance_criteria": ["4 asset cards", "Real-time prices", "Sparkline charts", "Auto-refresh 60s"] },
  { "id": "F4", "title": "Fear Gauge Index", "status": "todo", "priority": 1, "milestone": "M3", "acceptance_criteria": ["Gauge chart 0-100", "Weighted formula", "Color-coded zones", "Methodology tooltip"] },
  { "id": "F5", "title": "Google Sheets Webhook", "status": "todo", "priority": 2, "milestone": "M4", "acceptance_criteria": ["Apps Script deployed via clasp", "POST on calculate click", "Success/error toast", "Privacy notice"] },
  { "id": "F6", "title": "Adsterra Ad Integration", "status": "todo", "priority": 2, "milestone": "M5", "acceptance_criteria": ["Banner ad slot", "Native ad slot", "Social bar", "Async loading", "No UX disruption"] },
  { "id": "F7", "title": "Visitor Counter", "status": "todo", "priority": 3, "milestone": "M6", "acceptance_criteria": ["Today + total count", "Footer placement", "Session dedup", "API route"] },
  { "id": "F8", "title": "SEO & Performance", "status": "todo", "priority": 2, "milestone": "M7", "acceptance_criteria": ["Meta tags", "JSON-LD", "Sitemap", "Lighthouse ≥90", "Keywords in H1"] },
  { "id": "F9", "title": "Final Polish & Deploy", "status": "todo", "priority": 1, "milestone": "M8", "acceptance_criteria": ["All features done", "Responsive test passed", "Production deploy", "README complete"] }
]
```

---

**END OF PRD — Claude Code: read this file at the start of every session. Follow Section 0 (Harness Protocol) exactly. Build autonomously. Push at milestones. Zero cost. Ship it.** 🚀