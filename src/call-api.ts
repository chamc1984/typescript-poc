import axios from "axios";

// axios.createを利用することで、baseURLを共有でき、ヘッダーやパラメータも共通設定できる
const apiClient = axios.create({
  // https://httpbin.org/ を利用させて頂く
  baseURL: "https://httpbin.org",
  timeout: 5000, // ms. =5秒
  headers: {
    "content-type": "application/json",
  },
});

export const getRequest = async () => {
  console.log("START getRequest().");

  try {
    const response = await apiClient.get("/get");

    // response.data は any型
    console.log("GetRequest response data.headers:", response.data.headers);
    // response.data は any型. 存在しないプロパティを参照すると `undefined` になる
    console.log("GetRequest response data.header:", response.data.header);
  } catch (error) {
    console.log("Error:", error);
  }

  console.log("END getRequest().");
};

export const postRequest = async () => {
  console.log("START postRequest().");
  const data = {
    name: "my name",
    age: 30,
  };

  try {
    const response = await apiClient.post("/post", data);

    console.log("PostRequest response data:", response.data);
  } catch (error) {
    console.log("Error:", error);
  }

  console.log("END postRequest().");
};
