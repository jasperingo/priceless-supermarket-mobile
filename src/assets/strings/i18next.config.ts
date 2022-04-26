import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './en.json';

i18n.use(initReactI18next).init({
  saveMissing: true,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: EN,
    },
  },
});

// i18n.on('missingKey', (_, __, key: string) =>
//   console.warn(`MISSING_STRING-KEY: ${key}`),
// );

export default i18n;
