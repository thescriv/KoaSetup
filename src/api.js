const Koa = require('koa')
const { logger } = require('./utils/logger')

const { createConnection, closeConnection } = require('./helpers/db')

const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const { globalMiddleware } = require('./middleware/handleSuccess')
const { handleErrorMiddleware } = require('./middleware/handleError')

const helloWorldRouter = require('./api/helloWorld/helloWorld.index')

const config = require('./config')

const log = logger.child({ func: 'api' })

let server

async function startApi(port) {
  const app = new Koa()

  await createConnection()

  app.use(bodyParser())
  app.use(cors())

  app.use(globalMiddleware)
  app.use(handleErrorMiddleware)

  app.use(helloWorldRouter)

  server = app.listen(port || config.API_PORT)

  log.info({ func: 'startApi' }, `Listening on port ${port || config.API_PORT}`)

  server.on('error', log.error)

  return server
}

async function stopApi() {
  await Promise.all([
    new Promise((resolve) => {
      log.info({ func: 'stopApi' }, 'Closing server...')

      if (server) {
        server.close()

        log.info({ func: 'stopApi' }, 'Server closed.')
      } else {
        log.info({ func: 'stopApi' }, 'Server already closed.')
      }
      resolve()
    }),
    closeConnection()
  ])
}

process.on('SIGTERM', async () => {
  log.info({ func: 'stopApi' }, 'get a SIGTERM signal')
  await stopApi()
})
process.on('SIGINT', async () => {
  log.info({ func: 'stopApi' }, 'get a SIGINT signal')
  await stopApi()
})

module.exports = { startApi, stopApi }
