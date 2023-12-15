import Axios from "../Axios";

const StaffService = {
  getLichRanhNS: async () => {
    const res = await Axios.get("/nhanvien/lichRanhNS");
    return res;
  },
  getLichHenNS: async () => {
    const res = await Axios.get("/nhanvien/lichHen");
    return res;
  },
  taoTaiKhoanKH: async (data) => {
    const res = await Axios.post("/nhanvien/khachHang", {
      sdt: data.sdt,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
    });

    return res;
  },
  taoHoaDon: async (data) => {
    console.log("test apio",data);
    const res = await Axios.post("/nhanvien/hoaDon", {
      sdt: data.sdt,
      stt: data.stt,
      manv: data.manv,
    });
    return res;
  },
  xacNhanThanhToan: async (data) => {
    const res = await Axios.put("/nhanvien/xacNhanHoaDon", data);
    return res;
  },
  doiMatKhau: async (data) => {
    const res = await Axios.put("/nhanvien/matKhau", data);
    return res;
  },
  getAllThuoc: async () => {
    const res = await Axios.get("/nhanvien/getAllThuoc");
    return res;
  },
  getAllDV: async () => {
    const res = await Axios.get("/nhanvien/getAllDV");
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/nhanvien/getAllCa");
    return res;
  },
  getHoaDon: async (sdt) => {
    const res = await Axios.get(`/nhanvien/hoaDon/${sdt}`);
    return res;
  },
  xemBenhAn: async (sdt) => {
    const res = await Axios.get(`/nhanvien/benhAn/${sdt}`);
    return res;
  },
  getAllDSNhaSi: async () => {
    const res = await Axios.get("/nhanvien/getAllDSNhaSi");
    return res;
  },
  deleteLichHen: async (data) => {
    const res = await Axios.delete("/nhanvien/lichHen", data);
    return res;
  },
};
export default StaffService;
