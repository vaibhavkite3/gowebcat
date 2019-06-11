import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/en.json'
import axios from 'axios'

Vue.use(VueI18n)
Vue.use(messages)
export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})

const loadedLanguages = [] // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang
  i18n.fallbackLocale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (lang === '' || lang === undefined) {
    return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${i18n.locale}.json`).then(msgs => {
      i18n.setLocaleMessage('en', msgs.default)
      // loadedLanguages.push(lang)
      return setI18nLanguage('en')
    })
  } else {
    if (!i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}.json`).then(msgs => {
          i18n.setLocaleMessage(lang, msgs.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return Promise.resolve(setI18nLanguage(lang))
    }
  }

  return Promise.resolve(lang)
}
