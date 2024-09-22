import axios from "axios";
import { logger } from "./util/logger.js";

// axios.createを利用することで、baseURLを共有でき、ヘッダーやパラメータも共通設定できる
const apiClient = axios.create({
  // https://httpbin.org/ を利用させて頂く
  baseURL: "https://httpbin.org",
  timeout: 5000, // ms. =5秒
  headers: {
    "content-type": "application/json",
  },
});

// Axiosのリクエストにインターセプターを追加してログを出力
apiClient.interceptors.request.use(
  (request) => {
    logger.info(
      `Sending ${request.method?.toUpperCase()} request to ${request.url}`
    );
    return request;
  },
  (error) => {
    logger.error(`Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

// Axiosのレスポンスにインターセプターを追加してログを出力
apiClient.interceptors.response.use(
  (response) => {
    logger.info(
      `Received response from ${response.config.url} with status ${response.status}`
    );
    return response;
  },
  (error) => {
    logger.error(`Response error: ${error.message}`);
    return Promise.reject(error);
  }
);

export const getRequest = async () => {
  logger.info("START getRequest().");

  try {
    const response = await apiClient.get("/get");

    // response.data は any型
    logger.info(
      `GetRequest responseHeaders: ${JSON.stringify(response.data.headers)}`
    );
    // response.data は any型. 存在しないプロパティを参照すると `undefined` になる
    logger.info(
      `GetRequest response data.header: ${JSON.stringify(response.data.header)}`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Request Failed: ${error.message}`, { stack: error.stack });
    } else {
      logger.error(`Unexpected error: ${error}`);
    }
  }

  logger.info("END getRequest().");
};

export const postRequest = async () => {
  logger.info("START postRequest().");
  const data = {
    name: "my name",
    age: 30,
  };

  try {
    const response = await apiClient.post("/post", data);

    logger.info(`PostRequest response data: ${JSON.stringify(response.data)}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Request Failed: ${error.message}`, { stack: error.stack });
    } else {
      logger.error(`Unexpected error: ${error}`);
    }
  }

  logger.info("END postRequest().");
};
