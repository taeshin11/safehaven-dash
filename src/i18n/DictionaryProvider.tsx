'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

interface I18nContext {
  dict: Dictionary;
  locale: Locale;
}

const DictContext = createContext<I18nContext>({
  dict: {},
  locale: 'en',
});

export function DictionaryProvider({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <DictContext.Provider value={{ dict, locale }}>
      {children}
    </DictContext.Provider>
  );
}

export function useDict() {
  return useContext(DictContext);
}
