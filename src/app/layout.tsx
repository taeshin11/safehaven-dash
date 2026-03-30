import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  manifest: '/manifest.json',
  other: {
    'msvalidate.01': '',
    'naver-site-verification': '',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
  appleWebApp: {
    capable: true,
    title: 'SafeHaven Dash',
    statusBarStyle: 'black-translucent',
  },
  category: 'Finance',
  title: 'Gold Price & Safe Haven Dashboard | Fear Gauge Live — SafeHaven Dash',
  description:
    'Track gold, USD index, CHF, JPY in real-time. Free safe-haven dashboard with live Fear Gauge. See if markets are calm or panicking.',
  keywords: [
    'gold price today',
    'safe haven tracker',
    'dollar index live',
    'fear gauge market',
    'USD CHF JPY gold dashboard',
    'safe haven assets tracker',
    'market fear gauge',
    'gold vs dollar chart',
    'CHF JPY strength indicator',
    'safe haven currency tracker',
    'gold price live chart',
    'market fear index today',
    'is gold going up',
    'flight to safety indicator',
    'gold price forecast',
    'safe haven investment dashboard',
    'dollar index today',
    'japanese yen strength',
    'swiss franc safe haven',
  ],
  metadataBase: new URL('https://safehaven-dash.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gold Price & Safe Haven Dashboard | Fear Gauge Live',
    description:
      'Track gold, USD index, CHF, JPY in real-time. Free safe-haven dashboard with live Fear Gauge.',
    url: 'https://safehaven-dash.vercel.app',
    siteName: 'SafeHaven Dash',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SafeHaven Dash — Gold & Safe Haven Currency Dashboard with Fear Gauge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price & Safe Haven Dashboard | Fear Gauge Live',
    description:
      'Track gold, USD index, CHF, JPY in real-time. Free safe-haven dashboard with live Fear Gauge.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SafeHaven Dash',
  description:
    'Free real-time dashboard tracking gold, USD index, CHF, JPY with a custom Fear Gauge index for safe-haven asset monitoring.',
  url: 'https://safehaven-dash.vercel.app',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'SafeHaven Dash',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external API domains for faster data loading */}
        <link rel="preconnect" href="https://api.frankfurter.dev" />
        <link rel="dns-prefetch" href="https://api.frankfurter.dev" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
