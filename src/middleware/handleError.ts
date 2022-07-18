import { logger } from '../utils/logger'

import { translate } from '../utils/i18n'
import { ContextApp } from '../interface'
import { HttpError } from 'http-errors'

const log = logger.child({ func: 'handleErrorMiddleware' })

export default async function handleErrorMiddleware(
  ctx: ContextApp,
  next: () => void
) {
  try {
    await next()
  } catch (err: unknown) {
    let error

    if (err instanceof HttpError) {
      ctx.status = err.status || 500

      const errorMessage = translate(err?.message || 'errors.default', {
        lng: ctx?.language || 'en'
      })

      error = {
        message: errorMessage,
        help: err?.help || errorMessage
      }

      log.error({ err })
    }

    ctx.body = error
  }
}
