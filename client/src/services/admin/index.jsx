import Axios from "../Axios";

const AdminService = {
  getAllNhanVien: async () => {
    try {
      const res = await Axios.get("/qtv/getAllNhanVien");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getAllNhaSi: async () => {
    try {
      const res = await Axios.get("/qtv/getAllNhaSi");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getAllQTV: async () => {
    try {
      const res = await Axios.get("/qtv/getAllQTV");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getAllKhachHang: async () => {
    try {
      const res = await Axios.get("/qtv/getAllKhachHang");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getAllThuoc: async () => {
    try {
      const res = await Axios.get("/qtv/getAllThuoc");
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  getAllDV: async () => {
    try {
      const res = await Axios.get("/qtv/getAllDV");
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  getAllCa: async () => {
    try {
      const res = await Axios.get("/qtv/getAllCa");
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  getAllDSNhaSi: async () => {
    try {
      const res = await Axios.get("/qtv/getAllDSNhaSi");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  themThuoc: async (data) => {
    try {
      const res = await Axios.post("/qtv/themThuoc", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  themDV: async (data) => {
    try {
      const res = await Axios.post("/qtv/themDV", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  nhapThuoc: async (data) => {
    try {
      const res = await Axios.put("/qtv/nhapThuoc", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  xoaThuoc: async (data) => {
    try {
      const res = await Axios.delete("/qtv/xoaThuoc", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  suaThuoc: async (data) => {
    try {
      const res = await Axios.put("/qtv/suaThuoc", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  suaDV: async (data) => {
    try {
      const res = await Axios.put("/qtv/suaDV", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  nhanVien: async (data) => {
    try {
      const res = await Axios.put("/qtv/nhanVien", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  themNhanVien: async (data) => {
    try {
      const res = await Axios.post("/qtv/nhanVien", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  blockNhanVien: async (data) => {
    try {
      const res = await Axios.put("/qtv/blockNhanVien", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  unblockNhanVien: async (data) => {
    try {
      const res = await Axios.put("/qtv/unblockNhanVien", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  themNhaSi: async (data) => {
    try {
      const res = await Axios.post("/qtv/nhasi", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  suaNS: async (data) => {
    try {
      const res = await Axios.put("/qtv/nhasi", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  blockNhaSi: async (data) => {
    try {
      const res = await Axios.put("/qtv/blockNhaSi", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  unblockNhaSi: async (data) => {
    try {
      const res = await Axios.put("/qtv/unblockNhaSi", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  themQTV: async (data) => {
    try {
      const res = await Axios.post("/qtv/themQTV", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  blockKH: async (data) => {
    try {
      const res = await Axios.put("/qtv/blockKH", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  unblockKH: async (data) => {
    try {
      const res = await Axios.put("/qtv/unblockKH", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  matKhau: async (data) => {
    try {
      const res = await Axios.put("/qtv/matKhau", data);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};
export default AdminService;
