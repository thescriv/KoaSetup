const { logger } = require('../utils/logger')
const { translate } = require('../utils/i18n')

const log = logger.child({ func: 'handleErrorMiddleware' })

async function handleErrorMiddleware(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500

    const errorMessage = translate(err?.message || 'errors.default', {
      lng: ctx?.language || 'en'
    })

    const error = {
      message: errorMessage,
      help: err?.help || errorMessage
    }

    log.error({ err })

    ctx.body = error
  }
}

module.exports = { handleErrorMiddleware }
