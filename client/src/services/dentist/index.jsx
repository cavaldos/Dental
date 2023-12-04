import Axios from "../Axios";


const DentistService = {
    dangKyLichRanh: async (data) => {
        try {
            const res = await Axios.post("/nhasi/lichRanh", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    huyLichRanh: async (data) => {
        try {
            const res = await Axios.delete("/nhasi/lichRanh", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    taoBenhAn: async (data) => {
        try {
            const res = await Axios.post("/nhasi/benhAn", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    themCTDV: async (data) => {
        try {
            const res = await Axios.post("/nhasi/CTDV", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    themCTTHUOC: async (data) => {
        try {
            const res = await Axios.post("/nhasi/CTThuoc", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    doiMatKhau: async (data) => {
        try {
            const res = await Axios.put("/nhasi/matKhau", data);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemCaDu2NguoiTruc: async (mans) => {
        try {
            const res = await Axios.get(`/nhasi/caDu2NguoiTruc/${mans}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemLichRanhChuaDuocDat: async (mans) => {
        try {
            const res = await Axios.get(`/nhasi/lichRanhChuaDuocDat/${mans}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllThuoc: async () => {
        try {
            const res = await Axios.get("/nhasi/getAllThuoc");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllDV: async () => {
        try {
            const res = await Axios.get("/nhasi/getAllDV");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllCa: async () => {
        try {
            const res = await Axios.get("/nhasi/getAllCa");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemLichHen: async (mans) => {
        try {
            const res = await Axios.get(`/nhasi/lichHen/${mans}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    getAllDSNhaSi: async () => {
        try {
            const res = await Axios.get("/nhasi/getAllDSNhaSi");
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    xemBenhAn: async (sdt) => {
        try {
            const res = await Axios.get(`/nhasi/benhAn/${sdt}`);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
};
export default DentistService;

