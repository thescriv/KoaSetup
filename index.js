require('dotenv').config()

const { startApi, stopApi } = require('./src/api')

async function main() {
  startApi()
}

process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received.')

  await stopApi()
})

main()
