const dotenv = require('dotenv')

const { startApi } = require('./src/api')

async function main() {
  try {
    dotenv.config()

    await startApi()
  } catch (err) {
    console.error({ err })
  }
}

main()
