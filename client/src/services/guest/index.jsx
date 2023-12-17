import Axios from "../Axios";

const GuestService = {
  getAllDV: async () => {
    const res = await Axios.get("/khachhang/getAllDV");
    return res;
  },
  taoTKKH: async (data) => {
    const res = await Axios.post("/khachhang/taoKH", {
      sdt: data.sdt,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      matkhau: data.matkhau,
    });
    return res;
  },
  getAllDSNS: async () => {
    const res = await Axios.get("/khachhang/getAllDSNhaSi");
    return res;
  },
  getAllCa: async () => {
    const res = await Axios.get("/khachhang/getAllCa");
    return res;
  },
  lichRanh: async () => {
    const res = await Axios.get("/khachhang/lichRanh");
    return res;
  },
  loaiThuoc: async (mathuoc) => {
    const res = await Axios.get(`/khachhang/loaiThuoc/${mathuoc}`);
    return res;
  },
  loaiDV: async (madv) => {
    const res = await Axios.get(`/khachhang/loaiDV/${madv}`);
    return res;
  },
  chitietHoSo: async (type, id) => {
    console.log(type, id);
    const res = await Axios.get(`/khachhang/${type}/${id}`);
    return res;
  },
  lichHen: async () => {
    const res = await Axios.get("/khachhang/lichHen");
    return res;
  },
  taoLichHen: async (data) => {
    const res = await Axios.post("/khachhang/lichHen", {
      sodt: data.sodt,
      mans: data.mans,
      sott: data.sott,
      lydokham: data.lydokham,
    });
    return res;
  },
  benhAn: async (sdt) => {
    const res = await Axios.get(`/khachhang/benhAn/${sdt}`);
    return res;
  },
  deleteLichHen: async (data) => {
    const res = await Axios.delete(`/khachhang/xoalichHen`, {
      mans: data.mans,
      sdt: data.sdt,
      stt: data.stt,
    });
    return res;
  },
  capnhatKH: async (data) => {
    const res = await Axios.put("/khachhang/capnhatKH", {
      userId: data.userId,
      hoten: data.hoten,
      phai: data.phai,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      matkhaucu: data.matkhaucu,
      matkhaumoi: data.matkhaumoi,
    });
    return res;
  },
  xemthongtinKH: async () => {
    const res = await Axios.get("/khachhang/xemthongtinKH");
    return res;
  },
  xemLRChuaDatTatCaNSTheoNgay: async () => {
    const res = await Axios.get("/khachhang/lichRanhTheoNgay");
    return res;
  },
};

export default GuestService;
