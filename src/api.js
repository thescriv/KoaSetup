const Koa = require("koa");

const { handleErrorMiddleware } = require("./middleware/handleError");

const helloWorldRouter = require("./api/helloWorld/helloWorld.index");
const errorOnPurposeRouter = require("./api/errorOnPurpose/errorOnPurpose.index");

const app = new Koa();

const PORT = 3000;

let server;

async function startApi() {
  app.use(handleErrorMiddleware);

  app.use(helloWorldRouter);
  app.use(errorOnPurposeRouter);

  server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

async function stopApi() {
  await new Promise((resolve) => server.close(resolve));

  console.log("Closing server...");
}

module.exports = { startApi, stopApi };
