import Axios from "../Axios";

// router.post("/taoKH", khachHangController.taoTKKH);
// router.get("/getAllCa", khachHangController.getAllCa);
// router.get("/getAllDV", khachHangController.getAllDV);
// router.get("/getAllDSNhaSi", khachHangController.getAllDSNS);
// router.get("/lichRanh", khachHangController.xemLRChuaDatTatCaNS);
// router.get("/loaiThuoc/:mathuoc", khachHangController.xemThuoc);
// router.get("/loaiDV/:madv", khachHangController.xemDV);
const GuestService = {
  taoTKKH: async (data) => {
    const res = await Axios.post("/khachhang/taoKH", data);
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/khachhang/getAllCa");
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/khachhang/getAllDV");
    return res;
  },
  getAllDSNhaSi: async () => {
    const res = await Axios.get("/khachhang/getAllDSNhaSi");
    return res;
  },
  xemLRChuaDatTatCaNS: async () => {
    const res = await Axios.get("/khachhang/lichRanh");
    return res;
  },
  xemThuoc: async (mathuoc) => {
    const res = await Axios.get(`/khachhang/loaiThuoc/${mathuoc}`);
    return res;
  },
  xemDV: async (madv) => {
    const res = await Axios.get(`/khachhang/loaiDV/${madv}`);
    return res;
  },
  chitietHoSo: async (type,id ) => {
    console.log(type, id);
    const res = await Axios.get(`/khachhang/${type}/${id}`);
    return res;
  },
};
export default GuestService;
