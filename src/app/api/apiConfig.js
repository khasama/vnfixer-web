// export const baseURL =
//   "https://dd8f-2001-ee0-4b45-7de0-dd5f-7d7f-9ea-6409.ngrok-free.app/api/";
export const baseURL = "http://localhost:5000/api/";
const provideURL = "https://provinces.open-api.vn/api/p/";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});
export const provinces = axios.create({
  baseURL: provideURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, DELETE, PATCH, OPTIONS";
    config.headers["Content-Type"] = "application/json";
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
