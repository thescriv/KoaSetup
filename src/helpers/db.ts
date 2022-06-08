import { MongoClient } from 'mongodb'

import config from '../config'
import { logger } from '../utils/logger'

const log = logger.child({ file: 'db' })

let client: MongoClient
let dbPromise: MongoClient

async function createConnection() {
  if (dbPromise) {
    return dbPromise
  }

  client = new MongoClient(
    `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}` /* ,
    { useNewUrlParser: true } as {} */
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
  if (client) {
    client?.close()

    log.info({ func: 'closeConnection' }, 'Connection closed.')
  } else {
    log.info({ func: 'closeConnection' }, 'connection already closed.')
  }
}

function getDbClient() {
  return client.db()
}

export { isConnected, createConnection, closeConnection, getDbClient }
