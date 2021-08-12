/* const superagent = require("superagent");

const apiUrl = "localhost:3000"; */

const apiClient = async () => {
  const helloWorldApi = async () => {
    const res = { body: "helloWorld", status: 200 }; //await superagent().get(`${apiUrl}/api`);

    return res;
  };

  const errorOnPurpose = async () => {
    const res = { body: { message: "an error occured !" }, status: 400 }; //await superagent().get(`${apiUrl}/api/error`);

    return res;
  };

  return { helloWorldApi, errorOnPurpose };
};

module.exports = { apiClient };
