import Axios from "../Axios";


// router.post("/taoKH", khachHangController.taoTKKH);
// router.get("/getAllCa", khachHangController.getAllCa);
// router.get("/getAllDV", khachHangController.getAllDV);
// router.get("/getAllDSNhaSi", khachHangController.getAllDSNS);
// router.get("/lichRanh", khachHangController.xemLRChuaDatTatCaNS);
// router.get("/loaiThuoc/:mathuoc", khachHangController.xemThuoc);
// router.get("/loaiDV/:madv", khachHangController.xemDV);
const GuestService ={
    taoTKKH: async (data) => {
        try {
            const res = await Axios.post("/khachhang/taoKH", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllCa: async () => {
        try {
            const res = await Axios.get("/khachhang/getAllCa");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllDV: async () => {
        try {
            const res = await Axios.get("/khachhang/getAllDV");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllDSNhaSi: async () => {
        try {
            const res = await Axios.get("/khachhang/getAllDSNhaSi");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemLRChuaDatTatCaNS: async () => {
        try {
            const res = await Axios.get("/khachhang/lichRanh");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemThuoc: async (mathuoc) => {
        try {
            const res = await Axios.get(`/khachhang/loaiThuoc/${mathuoc}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemDV: async (madv) => {
        try {
            const res = await Axios.get(`/khachhang/loaiDV/${madv}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
}
export default GuestService;