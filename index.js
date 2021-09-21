require("dotenv").config()

const { startApi, stopApi } = require("./src/api")

async function main() {
  console.log(process.env)

  startApi()
}

process.on("SIGTERM", async () => {
  console.info("SIGTERM signal received.")

  await stopApi()
})

main()
