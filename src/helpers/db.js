const { MongoClient } = require('mongodb')

const config = require('../config')

const { logger } = require('../utils/logger')

const log = logger.child({ file: 'db' })

let client
let dbPromise

async function createConnection() {
  if (dbPromise) {
    return dbPromise
  }

  client = new MongoClient(
    `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`,
    { useNewUrlParser: true }
  )

  log.info({ func: 'createConnection' }, 'Initalize connection to Database...')
  dbPromise = await client.connect()

  log.info({ func: 'createConnection' }, 'Connected to Database')

  return dbPromise
}

function isConnected() {
  return !!dbPromise?.topology?.isConnected()
}

function closeConnection() {
  log.info({ func: 'closeConnection' }, 'closing connection')
  if (dbPromise) {
    client.close()

    client = null
    dbPromise = null

    log.info({ func: 'closeConnection' }, 'Connection closed.')
  } else {
    log.info({ func: 'closeConnection' }, 'connection already closed.')
  }
}

function getDbClient() {
  return dbPromise.db()
}

module.exports = {
  isConnected,
  createConnection,
  closeConnection,
  getDbClient
}
