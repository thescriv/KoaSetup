const superagent = require('superagent')

class apiClient {
  constructor(port) {
    this.apiUrl = `localhost:${port}`
  }

  async getHelloWorld() {
    const res = await superagent.get(`${this.apiUrl}/hello_world/classic_get`)

    return res
  }

  async postHelloWorld(payload) {
    const res = await superagent
      .post(`${this.apiUrl}/hello_world/classic_post`)
      .set(payload)

    return res
  }

  async classicErrorOnPurpose() {
    await superagent.get(`${this.apiUrl}/error/classic`)
  }

  async httpErrorOnPurpose() {
    await superagent.get(`${this.apiUrl}/error/http`)
  }
}

module.exports = { apiClient }
