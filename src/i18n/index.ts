import * as Localization from 'expo-localization';
import i18n, { type TOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '@/src/i18n/locales/en';
import { es } from '@/src/i18n/locales/es';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    lng: Localization.getLocales()[0]?.languageCode ?? 'es',
    resources,
  });
}

export { i18n };

export function t(key: string, options?: TOptions): string {
  return i18n.t(key, options);
}
