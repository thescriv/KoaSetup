const { startApi, stopApi } = require("../../src/api")
const {apiClient} = require("../apiClient")

let client

describe("HelloWorld API", () => {
  beforeAll(async () => {
    await startApi(3000)

    client = new apiClient(3000)
  })

  afterAll(async () => {
    await stopApi()
  })

  describe("HelloWorldApi", () => {
    test("do fetch helloWorldRouter", async () => {
      const { body, status } = await client.helloWorldApi()

      expect({ body, status }).toMatchSnapshot()
    })
  })
})
