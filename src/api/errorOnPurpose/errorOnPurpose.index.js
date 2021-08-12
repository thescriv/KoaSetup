const Router = require("@koa/router");

const router = new Router();

router.get("/api/error", async (ctx) => {
  console.log("Error");

  throw new Error("ERROR");
});

module.exports = router.routes();
