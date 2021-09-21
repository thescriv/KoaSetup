const { startApi, stopApi } = require("../../src/api")
const {apiClient} = require("../apiClient")

describe("errorOnPurpose API", () => {
  let client = null

  beforeAll(async () => {
    await startApi(3001)

    client = new apiClient(3001)
  })

  afterAll(async () => {
    await stopApi()
  })

  describe("errorOnPurposeAPI", () => {
    test("do not fetch errorOnPurpose", async () => {
      let error

      try {
        await client.errorOnPurpose()
      } catch (err) {
        error = err.response
      }
      const { body, status } = error

      expect({ body, status }).toMatchSnapshot()
    })
  })
})
