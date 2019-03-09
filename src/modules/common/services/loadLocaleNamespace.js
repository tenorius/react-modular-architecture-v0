import i18n from '../i18n/i18n';

const helper = ns => new Promise((resolve, reject) => {
  const lng = i18n.language;
  // import(`./src/modules`).then((locale) => {
  //   i18n.addResourceBundle(i18n.language, ns, locale.default);
  //   resolve('module loaded');
  // }, (err) => {
  //   reject(err);
  // });
});

const loadLocaleNamespace = ns => new Promise((resolve, reject) => {
  if (i18n.isInitialized) {
    helper(ns).then(resolve, reject);
  }
  i18n.on('initialized', () => helper(ns).then(resolve, reject));
});


export default loadLocaleNamespace;
