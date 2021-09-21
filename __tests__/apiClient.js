const superagent = require("superagent")

class apiClient {
  constructor(port) {
    this.apiUrl = `localhost:${port}`
  }

  async helloWorldApi() {
    const res = await superagent.get(`${this.apiUrl}/api`)

    return res
  }

  async errorOnPurpose() {
    const res = await superagent.get(`${this.apiUrl}/api/error`)

    return res
  }
}

module.exports = { apiClient }
