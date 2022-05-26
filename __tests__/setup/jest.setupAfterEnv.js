const { restoreDate, mockDate } = require('../jest.mock')
const { stopApi } = require('../../src/api')
const {
  closeConnection,
  getDbClient,
  isConnected
} = require('../../src/helpers/db')

beforeEach(() => {
  restoreDate()

  mockDate()
})

afterEach(() => {
  jest.restoreAllMocks()
})

afterAll(async () => {
  if (isConnected()) {
    await getDbClient().dropDatabase()
  }

  await closeConnection()

  await stopApi()
})
