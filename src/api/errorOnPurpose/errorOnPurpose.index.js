const Router = require("@koa/router");
const {createError} = require('http-errors')

const router = new Router();

router.get("/api/error", async (ctx) => {
  throw new Error('an error occured')
});

module.exports = router.routes();
