const i18next = require('i18next')
const config = require('../config')

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

function translate(input, options = { lng: 'en' }) {
  if (config.ENABLE_I18N_TRANSLATION) {
    return i18next.t(input, options)
  }

  return input
}

module.exports = {
  translate
}
