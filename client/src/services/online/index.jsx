import Axios from "../Axios";

const OnlineService = {
  checkLogin: async (data) => {
    try {
      const res = await Axios.post("/online/dangnhap", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
export default OnlineService;
