const Koa = require('koa')
const { logger } = require('./utils/logger')

const { createConnection, closeConnection } = require('./helpers/db')

const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const { globalMiddleware } = require('./middleware/handleSuccess')
const { handleErrorMiddleware } = require('./middleware/handleError')

const helloWorldRouter = require('./api/helloWorld/helloWorld.index')

const config = require('./config')

const log = logger.child({ func: 'startApi' })

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

  log.info(`Listening on port ${port || config.API_PORT}`)

  server.on('error', log.info)

  return server
}

async function stopApi() {
  await Promise.all([
    new Promise((resolve) => {
      log.info('Closing server...')

      if (server) {
        server.close()

        log.info('Server closed.')
      } else {
        log.info('Server already closed.')
      }
      resolve()
    }),
    closeConnection()
  ])
}

process.on('SIGTERM', async () => {
  log.info('get a SIGTERM signal')
  await stopApi()
})
process.on('SIGINT', async () => {
  log.info('get a SIGINT signal')
  await stopApi()
})

module.exports = { startApi, stopApi }
