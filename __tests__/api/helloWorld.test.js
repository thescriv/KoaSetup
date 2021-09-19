const { startApi, stopApi } = require("../../src/api")
const { createApiClient } = require("../utils")

const config = require("../../src/config")

let apiClient

describe("HelloWorld API", () => {
  beforeAll(async () => {
    await startApi(3000)

    const apiUrl = `${config.API_URL}:3000`

    apiClient = createApiClient(apiUrl)
  })

  afterAll(async () => {
    await stopApi()
  })

  describe("HelloWorldApi", () => {
    test("do fetch helloWorldRouter", async () => {
      const { body, status } = await apiClient.helloWorldApi()

      expect({ body, status }).toMatchSnapshot()
    })
  })
})
