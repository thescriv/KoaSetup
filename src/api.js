const Koa = require("koa")

const { handleErrorMiddleware } = require("./middleware/handleError")

const helloWorldRouter = require("./api/helloWorld/helloWorld.index")
const errorOnPurposeRouter = require("./api/errorOnPurpose/errorOnPurpose.index")

const config = require("./config")

const app = new Koa()

let server

async function startApi(port) {
  app.use(handleErrorMiddleware)

  app.use(helloWorldRouter)
  app.use(errorOnPurposeRouter)

  server = app.listen(port || config.PORT, () => {
    console.log(`Listening on port ${port || config.PORT}`)
  })
}

async function stopApi() {
  await new Promise((resolve) => server.close(resolve))

  console.log("Closing server...")
}

module.exports = { startApi, stopApi }
