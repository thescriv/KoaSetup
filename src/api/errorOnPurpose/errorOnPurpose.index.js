const Router = require("@koa/router")

const { errorOnPurpose } = require("./errorOnPurpose.controller")

const router = new Router()

router.get("/api/error", errorOnPurpose)

module.exports = router.routes()
