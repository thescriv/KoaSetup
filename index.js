const Koa = require("koa");
const Router = require("@koa/router");

const { handleErrorMiddleware } = require('./src/middleware/handleError')

const helloWorldRouter = require('./src/api/helloWorld/helloWorld')

const app = new Koa();
const router = new Router();

const PORT = 3000;

app.use(handleErrorMiddleware)

app.use(helloWorldRouter)

router.get("/api/error", async (ctx) => {
  console.log("Hello");

  throw new Error("ERROR");
});

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
