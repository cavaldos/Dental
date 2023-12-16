import Axios from "../Axios";

const DentistService = {
  dangKyLichRanh: async (data) => {
    const res = await Axios.post("/nhasi/lichRanh", {
      mans: data.mans,
      maca: data.maca,
      ngay: data.ngay,
    });
    return res;
  },
  huyLichRanh: async (data) => {
    const res = await Axios.delete("/nhasi/lichRanh", {
      mans: data.mans,
      stt: data.stt,
    });
    return res;
  },
  taoBenhAn: async (data) => {
    const res = await Axios.post("/nhasi/benhAn", {
      sdt: data.sdt,
      ngaykham: data.ngaykham,
      mans: data.mans,
      DanDo: data.DanDo,
    });
    return res;
  },
  themCTDV: async (data) => {
    const res = await Axios.post("/nhasi/CTDV", {
      madv: data.madv,
      stt: data.stt,
      sdt: data.sdt,
      sldv: data.sldv,
    });
    return res;
  },
  themCTTHUOC: async (data) => {
    const res = await Axios.post("/nhasi/CTThuoc", {
      mathuoc: data.mathuoc,
      stt: data.stt,
      sdt: data.sdt,
      slthuoc: data.slthuoc,
      thoidiemdung: data.thoidiemdung,
    });
    return res;
  },
  doiMatKhau: async (data) => {
    const res = await Axios.put("/nhasi/matKhau", {
      mans: data.mans,
      matkhaucu: data.matkhaucu,
      matkhaumoi: data.matkhaumoi,
    });
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
