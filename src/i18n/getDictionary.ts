import type { Locale } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (dictionaries[locale] ?? dictionaries.en)();
}
