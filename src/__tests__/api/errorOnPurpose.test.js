const { startApi, stopApi } = require("../../api");
const { apiClient } = require("../utils");

describe("errorOnPurpose API", () => {
  beforeAll(async () => {
    await startApi();
  });

  afterAll(async () => {
    await stopApi();
  });

  describe("errorOnPurposeAPI", () => {
    test("do not fetch errorOnPurpose", async () => {
      let error;

      try {
        await apiClient.helloWorldApi();
      } catch (err) {
        error = err.response;
      }
      const { body, status } = error;

      expect({ body, status }).toMatchSnapshot();
    });
  });
});
