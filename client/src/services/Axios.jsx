import instance from "./axios.config";
import { message } from "antd";

const Axios = {
  get: async (url) => {
    try {
      const res = await instance.get(url);
      return res;
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  },
  post: async (url, data) => {
    try {
      const res = await instance.post(url, data);
      return res;
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  },
  put: async (url, data) => {
    try {
      const res = await instance.put(url, data);
      return res;
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  },
  patch: async (url, data) => {
    try {
      const res = await instance.patch(url, data);
      return res;
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  },

  delete: async (url) => {
    try {
      const res = await instance.delete(url);
      return res;
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  },
};
export default Axios;
