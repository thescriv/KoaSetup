const config = require('../../src/config')
const { createConnection } = require('../../src/helpers/db')

const { startApi } = require('../../src/api')

const { ApiClient } = require('../apiClient')

async function beforeAllSetup(port) {
  await createConnection(
    `${config.MONGO_DATABASE_NAME}-${config.JEST_WORKER_ID}`
  )

  await startApi(port)

  const client = new ApiClient(port)

  return client
}

module.exports = { beforeAllSetup }
