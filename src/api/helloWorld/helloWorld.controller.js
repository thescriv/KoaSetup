const { validateHelloWorldBody } = require('./helloWorld.schema')

async function getHelloWorldController(ctx) {
  ctx.body = {}
}

async function postHelloWorldController(ctx) {
  const {
    request: { body }
  } = ctx

  validateHelloWorldBody(body)

  ctx.body = { message: `Hello World ${body.name}` }
}

module.exports = { getHelloWorldController, postHelloWorldController }
