const config = require('../../../src/config')

const {
  createConnection,
  isConnected,
  closeConnection,
  getDbClient
} = require('../../../src/helpers/db')

describe('database connection API', () => {
  afterEach(() => {
    expect(isConnected()).toBe(false)
  })

  test('do test basic global env', () => {
    expect(config.MONGO_URL).toBeDefined()
    expect(config.MONGO_URL).toBe('mongodb://localhost:27017')

    expect(config.MONGO_DATABASE_NAME).toBeDefined()
    expect(config.MONGO_DATABASE_NAME).toBe('test-koaSetup')
  })

  test('do connect to the database and close connection', async () => {
    const dbConnection = await createConnection()

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)
    expect(dbConnection.s.url).toBe(
      `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
    )
    expect(dbConnection.db().s.namespace.db).toBe(config.MONGO_DATABASE_NAME)

    closeConnection()
  })

  test('do connect twice to the database and close connection', async () => {
    const dbConnection1 = await createConnection()

    expect(dbConnection1).toBeDefined()
    expect(dbConnection1.s.url).toBe(
      `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
    )
    expect(dbConnection1.db().s.namespace.db).toBe(config.MONGO_DATABASE_NAME)

    const dbConnection2 = await createConnection()

    expect(dbConnection2).toBeDefined()
    expect(dbConnection2.s.url).toBe(
      `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
    )
    expect(dbConnection2.db().s.namespace.db).toBe(config.MONGO_DATABASE_NAME)

    closeConnection()
  })

  test('do connect to the database and close connection twice', async () => {
    const dbConnection = await createConnection()

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)
    expect(dbConnection.s.url).toBe(
      `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
    )
    expect(dbConnection.db().s.namespace.db).toBe(config.MONGO_DATABASE_NAME)

    closeConnection()

    expect(isConnected()).toBe(false)

    closeConnection()
  })

  test('do connect to the database, insert in test collection and close connection', async () => {
    const dbConnection = await createConnection()

    expect(dbConnection).toBeDefined()
    expect(isConnected()).toBe(true)
    expect(dbConnection.s.url).toBe(
      `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
    )
    expect(dbConnection.db().s.namespace.db).toBe(config.MONGO_DATABASE_NAME)

    const insertedDocument = await getDbClient()
      .collection('test')
      .insertOne({ name: 'foobar' })

    const testDocument = await getDbClient()
      .collection('test')
      .findOne({ name: 'foobar' })

    expect(insertedDocument).toBeDefined()
    expect(testDocument).toBeDefined()

    expect(insertedDocument.insertedId.equals(testDocument._id))
    expect(testDocument.name).toBe('foobar')

    closeConnection()
  })
})
