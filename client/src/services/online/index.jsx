import Axios from "../Axios";

const OnlineService = {
  checkLogin: async (data) => {
    const res = await Axios.post("/online/dangnhap", data);
    return res;
  },
  taoTKKH: async (data) => {
    const res = await Axios.post("/online/taoKH", data);
    return res;
  },
  dangnhap: async (data) => {
    const res = await Axios.post("/online/dangnhap", data);
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/online/getAllDV");
    return res;
  },
  getAllDSNS: async () => {
    const res = await Axios.get("/online/getAllDSNhaSi");
    return res;
  },
};
export default OnlineService;
