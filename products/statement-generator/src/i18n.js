import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    whiteList: ['en', 'de'],
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    backend: {
      loadPath: () => {
        // check the domain to account for path
        const { host, pathname } = window.location;
        let pathPrefix = '';

        if (host.includes('github.io')) {
          pathPrefix = pathname;
        }

        const loadPath = `${pathPrefix}/locales/{{lng}}/{{ns}}.json`;

        return loadPath.replace('//', '/');
      },
    },
  });

export default i18n;
