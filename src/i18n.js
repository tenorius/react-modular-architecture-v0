/**
 * i18n Setup File
 *
 * - i18next (https://www.i18next.com/)
 * - React i18next (https://react.i18next.com/)
 */

import i18n from 'i18next';
import moment from 'moment';
import { reactI18nextModule } from 'react-i18next';
import LngDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

const defaultLanguage = 'en';
const selectedLanguage = null;

i18n
  .use(LngDetector)
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    load: 'languageOnly',
    ns: 'common',
    lng: selectedLanguage,
    defaultNS: 'common',
    fallbackNS: 'common',
    debug: false,
    fallbackLng: defaultLanguage, // use en if detected lng is not available
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: (value, format) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toUpperCase();
        if (value instanceof Date) return moment(value).format(format);
        return value;
      },
    },
    react: {
      wait: true, // configure the withNamespaces / NamespacesConsumer to not render the content until needed namespaces are loaded.
    },
    // browser-languagedetector module options
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })
  .on('languageChanged', (lng) => {
    moment.locale(lng);
  });

export default i18n;
