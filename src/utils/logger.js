const pino = require('pino')

const config = require('../config')

const pinoOption = {
  sync: true,
  level: config.LOGGER_LEVEL
}

/* istanbul ignore if */
if (['local'].includes(config.NODE_ENV)) {
  pinoOption.transport = { target: 'pino-pretty' }
}

const logger = pino(pinoOption)

module.exports = { logger }
