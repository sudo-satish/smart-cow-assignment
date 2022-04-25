const axios = require("axios").default;
const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_BE_SERVICE_URL ||
  "http://localhost:3001";

class RestApiClient {
  baseURL = AUTH_SERVICE_URL;
  public axios: any;
  constructor() {
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      // },
    });
  }
}

export default new RestApiClient();
