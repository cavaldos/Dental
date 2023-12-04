import axios from "axios";
const getCookie = (key) => {
  const cookieStr = document.cookie;
  if (!cookieStr) {
    return null;
  }
  const cookies = cookieStr.split("; ");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === key) {
      return value;
    }
  }

  return null;
}
const instance = axios.create({
  baseURL: "https://fakestoreapi.com/", // import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const token = getCookie("token");
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
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
