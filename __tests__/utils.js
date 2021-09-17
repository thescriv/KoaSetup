const superagent = require("superagent")

function createApiClient(apiUrl) {
  async function helloWorldApi() {
    const res = await superagent.get(`${apiUrl}/api`)

    return res
  }

  async function errorOnPurpose() {
    const res = await superagent.get(`${apiUrl}/api/error`)

    return res
  }

  return {
    helloWorldApi,
    errorOnPurpose,
  }
}

module.exports = { createApiClient }
