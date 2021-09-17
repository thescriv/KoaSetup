const { startApi, stopApi } = require("../../src/api")
const { createApiClient } = require("../utils")

const config = require("../../src/config")

describe("errorOnPurpose API", () => {
  let apiClient = null

  beforeAll(async () => {
    await startApi(3001)

    const apiUrl = `${config.API_URL}:3001`

    apiClient = createApiClient(apiUrl)
  })

  afterAll(async () => {
    await stopApi()
  })

  describe("errorOnPurposeAPI", () => {
    test("do not fetch errorOnPurpose", async () => {
      let error

      try {
        await apiClient.errorOnPurpose()
      } catch (err) {
        error = err.response
      }
      const { body, status } = error

      expect({ body, status }).toMatchSnapshot()
    })
  })
})
