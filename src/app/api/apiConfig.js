// export const baseURL =
//   "https://077f-2405-4802-95d0-a426-b0a7-d68b-92f2-dc8a.ngrok-free.app/";
export const baseURL = "http://localhost:5000/api/";
const provideURL = "https://provinces.open-api.vn/api/p/";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
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
