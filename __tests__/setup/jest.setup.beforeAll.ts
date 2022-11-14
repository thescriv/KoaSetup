import config from '../../src/config'
import { createConnection } from '../../src/helpers/db'

import { startApi } from '../../src/api'

import ApiClient from '../apiClient'

export default async function beforeAllSetup(port: any) {
  await createConnection(
    `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}-${config.JEST_WORKER_ID}`
  )

  await startApi(port)

  const client = new ApiClient(port)

  return client
}
