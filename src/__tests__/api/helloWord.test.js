const { startApi, stopApi } = require("../../api");
const { apiClient } = require("../utils");

describe("HelloWorld API", () => {
  beforeAll(async () => {
    await startApi();
  });

  afterAll(async () => {
    await stopApi();
  });

  describe("HelloWorldApi", () => {
    test("do fetch helloWorldRouter", async () => {
      const { body, status } = await apiClient.helloWorldApi;

      expect({ body, status }).toMatchSnapshot();
    });
  });
});
