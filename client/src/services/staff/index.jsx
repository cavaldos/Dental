import Axios from "../Axios";



const StaffService = {
    getLichRanhNS: async () => {
        try {
        const res = await Axios.get("/nhanvien/lichRanhNS");
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    taoTaiKhoanKH: async (data) => {
        try {
        const res = await Axios.post("/nhanvien/khachHang", data);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    taoHoaDon: async (data) => {
        try {
        const res = await Axios.post("/nhanvien/hoaDon", data);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    xacNhanThanhToan: async (data) => {
        try {
        const res = await Axios.put("/nhanvien/xacNhanHoaDon", data);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    doiMatKhau: async (data) => {
        try {
        const res = await Axios.put("/nhanvien/matKhau", data);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    getAllThuoc: async () => {
        try {
        const res = await Axios.get("/nhanvien/getAllThuoc");
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    getAllDV: async () => {
        try {
        const res = await Axios.get("/nhanvien/getAllDV");
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    getAllCa: async () => {
        try {
        const res = await Axios.get("/nhanvien/getAllCa");
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    getHoaDon: async (sdt) => {
        try {
        const res = await Axios.get(`/nhanvien/hoaDon/${sdt}`);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    xemBenhAn: async (sdt) => {
        try {
        const res = await Axios.get(`/nhanvien/benhAn/${sdt}`);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    getAllDSNhaSi: async () => {
        try {
        const res = await Axios.get("/nhanvien/getAllDSNhaSi");
        return res;
        } catch (err) {
        console.log(err);
        }
    },
    deleteLichHen: async (data) => {
        try {
        const res = await Axios.delete("/nhanvien/lichHen", data);
        return res;
        } catch (err) {
        console.log(err);
        }
    },
};
export default StaffService;