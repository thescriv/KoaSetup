import createError from 'http-errors'
import { validateHelloWorldBody } from './helloWorld.schema'

import { ContextApp } from '../../interface'

async function getHelloWorldController(ctx: ContextApp) {
  ctx.body = {}
}

async function postHelloWorldController(ctx: ContextApp) {
  const {
    request: { body }
  } = ctx

  const helloWorldBodyValidation = validateHelloWorldBody(body)

  if (!helloWorldBodyValidation.isValid) {
    throw createError(400, helloWorldBodyValidation.errors[0])
  }

  ctx.body = { message: `Hello World ${body.name}` }
}

module.exports = { getHelloWorldController, postHelloWorldController }
