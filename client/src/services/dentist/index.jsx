import Axios from "../Axios";

const DentistService = {
  dangKyLichRanh: async (data) => {
    const res = await Axios.post("/nhasi/lichRanh", data);
    return res;
  },
  huyLichRanh: async (data) => {
    const res = await Axios.delete("/nhasi/lichRanh", data);
    return res;
  },
  taoBenhAn: async (data) => {
    const res = await Axios.post("/nhasi/benhAn", data);
    return res;
  },
  themCTDV: async (data) => {
    const res = await Axios.post("/nhasi/CTDV", data);
    return res;
  },
  themCTTHUOC: async (data) => {
    const res = await Axios.post("/nhasi/CTThuoc", data);
    return res;
  },
  doiMatKhau: async (data) => {
    const res = await Axios.put("/nhasi/matKhau", data);
    return res;
  },
  xemCaDu2NguoiTruc: async (mans) => {
    const res = await Axios.get(`/nhasi/caDu2NguoiTruc/${mans}`);
    return res;
  },
  xemLichRanhChuaDuocDat: async (mans) => {
    const res = await Axios.get(`/nhasi/lichRanhChuaDuocDat/${mans}`);
    return res;
  },
  getAllThuoc: async () => {
    const res = await Axios.get("/nhasi/getAllThuoc");
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/nhasi/getAllDV");
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/nhasi/getAllCa");
    return res;
  },
  xemLichHen: async (mans) => {
    const res = await Axios.get(`/nhasi/lichHen/${mans}`);
    return res;
  },
  getAllDSNhaSi: async () => {
    const res = await Axios.get("/nhasi/getAllDSNhaSi");
    return res;
  },
  xemBenhAn: async (sdt) => {
    const res = await Axios.get(`/nhasi/benhAn/${sdt}`);
    return res;
  },
};
export default DentistService;
