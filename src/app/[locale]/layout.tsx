import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { DictionaryProvider } from '@/i18n/DictionaryProvider';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const base = 'https://safehaven-dash.vercel.app';

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [
      'gold price today',
      'safe haven tracker',
      'dollar index live',
      'fear gauge market',
      'USD CHF JPY gold dashboard',
      'market fear gauge',
      'gold price live chart',
      'market fear index today',
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ko: '/ko',
        ja: '/ja',
        zh: '/zh',
        es: '/es',
        de: '/de',
        fr: '/fr',
        pt: '/pt',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${base}/${locale}`,
      siteName: 'SafeHaven Dash',
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : locale === 'ja' ? 'ja_JP' : locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'pt' ? 'pt_BR' : 'en_US',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'SafeHaven Dash — Gold & Safe Haven Currency Dashboard with Fear Gauge',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/opengraph-image'],
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SafeHaven Dash',
  description:
    'Free real-time dashboard tracking gold, USD index, CHF, JPY with a custom Fear Gauge index for safe-haven asset monitoring.',
  url: 'https://safehaven-dash.vercel.app',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: { '@type': 'Organization', name: 'SafeHaven Dash' },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DictionaryProvider dict={dict} locale={locale as Locale}>
        {children}
      </DictionaryProvider>
    </>
  );
}
