import config from '../../../src/config'

import {
  createConnection,
  isConnected,
  closeConnection
} from '../../../src/helpers/db_mysql'

describe('database connection API', () => {
  afterEach(() => {
    expect(isConnected()).toBe(false)
  })

  test('do test basic global env', () => {
    expect(config.MYSQL_URL).toBeDefined()
    expect(config.MYSQL_URL).toBe('localhost')

    expect(config.MYSQL_DATABASE_NAME).toBeDefined()
    expect(config.MYSQL_DATABASE_NAME).toBe('testMysqlKoaSetup')
  })

  test('do connect to the database and close connection', async () => {
    const dbConnection = await createConnection(
      `testKoaSetup${config.JEST_WORKER_ID}`
    )

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)

    const connectionConfig = (await (
      await dbConnection.getConnection()
    ).connect()) as any

    expect(connectionConfig.config.host).toBe('localhost')

    await closeConnection()
  })

  test('do connect twice to the database and close connection', async () => {
    const dbConnection1 = await createConnection(
      `testKoaSetup${config.JEST_WORKER_ID}`
    )

    expect(dbConnection1).toBeDefined()

    const connectionConfig1 = (await (
      await dbConnection1.getConnection()
    ).connect()) as any

    expect(connectionConfig1.config.host).toBe('localhost')

    const dbConnection2 = await createConnection()

    expect(dbConnection2).toBeDefined()

    const connectionConfig2 = (await (
      await dbConnection2.getConnection()
    ).connect()) as any

    expect(connectionConfig2.config.host).toBe('localhost')

    await closeConnection()
  })

  test('do connect to the database and close connection twice', async () => {
    const dbConnection = await createConnection(
      `testKoaSetup${config.JEST_WORKER_ID}`
    )

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)
    const connectionConfig = (await (
      await dbConnection.getConnection()
    ).connect()) as any

    expect(connectionConfig.config.host).toBe('localhost')

    await closeConnection()
    expect(isConnected()).toBe(false)

    await closeConnection()
    expect(isConnected()).toBe(false)
  })

  test('do connect to the database, insert in test collection and close connection', async () => {
    const dbConnection = await createConnection(
      `testKoaSetup${config.JEST_WORKER_ID}`
    )

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)
    const dbConnectionInformation = await dbConnection.getConnection()

    const connectionConfig = (await dbConnectionInformation.connect()) as any

    expect(connectionConfig.config.host).toBe('localhost')

    await dbConnection.query(
      `CREATE TABLE IF NOT EXISTS test (name VARCHAR(255))`
    )

    await dbConnection.query(`INSERT INTO test VALUES ('foobar')`)

    await closeConnection()
  })
})
