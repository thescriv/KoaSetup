const superagent = require('superagent')

class ApiClient {
  constructor(port) {
    this.apiUrl = `localhost:${port}`
  }

  async getHelloWorld() {
    return await superagent.get(`${this.apiUrl}/hello_world/classic_get`)
  }

  async postHelloWorld(payload) {
    return await superagent
      .post(`${this.apiUrl}/hello_world/classic_post`)
      .send(payload)
  }
}

module.exports = { ApiClient }
