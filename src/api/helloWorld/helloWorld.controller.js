const createError = require('http-errors')
const { validateHelloWorldBody } = require('./helloWorld.schema')

async function getHelloWorldController(ctx) {
  ctx.body = {}
}

async function postHelloWorldController(ctx) {
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
