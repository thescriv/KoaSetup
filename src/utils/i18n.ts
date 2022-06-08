import i18next from 'i18next'

import config from '../config'

i18next.init({
  supportedLngs: ['en', 'fr'],
  resources: {
    fr: {
      translation: {
        ...require('../locales/fr.json')
      }
    },
    en: {
      translation: {
        ...require('../locales/en.json')
      }
    }
  }
})

function translate(input: string, options = { lng: 'en' }) {
  if (config.ENABLE_I18N_TRANSLATION) {
    return i18next.t(input, options)
  }

  return input
}

export { translate }
