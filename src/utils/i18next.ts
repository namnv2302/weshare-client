import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextChainedBackend from 'i18next-chained-backend';
import { SUPPORTED_LOCALES } from '@constants/locales';

i18n
  .use(I18NextChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LOCALES.map(({ value }) => value),
    fallbackLng: 'en-US',
    defaultNS: 'Common',
    fallbackNS: 'Common',
    backend: {
      backends: [I18NextHttpBackend],
      backendOptions: [
        {
          expirationTime: 1 * 24 * 60 * 60 * 1000, // 7 days
          defaultVersion: '0.0.1',
        },
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  });

export default i18n;
