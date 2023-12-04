import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://192.168.1.53:3000", // import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log(response.status);
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
