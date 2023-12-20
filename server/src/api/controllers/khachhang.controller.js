import { getPool } from "../../config/db.mjs";
import { groupHSB, formatTime, convertBackToDate, filterRandomDentist } from "../../utils/groupData.js";
const pool =  getPool("KH");

const khachHangController = {
  xemThongTin: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SODT = req.userId;
      const sp = "SP_XEMTHONGTIN_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  capNhanThongTin: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SODT = req.body.userId;
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;
      params.NGAYSINH = req.body.ngaysinh;
      params.DIACHI = req.body.diachi;
      params.MAT_KHAU_CU = req.body.matkhaucu;
      params.MAT_KHAU_MOI = req.body.matkhaumoi;
      const sp = "SP_CAPNHATTHONGTIN_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.message === "Mật khẩu xác nhận không chính xác") {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === "Tài khoản không tồn tại trong hệ thống") {
        return res.status(400).json({ error: error.message });
      }
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemLRChuaDatTatCaNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      const sp = "SP_LRCHUADATTATCANS_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MA_THUOC = req.params.mathuoc;
      const sp = "SP_TRUYVANLOAITHUOC_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MA_MADV = req.params.madv;
      const sp = "SP_TRUYDICHVU_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SDT = req.params.sdt;
      console.log(req.params.sdt);
      const sp = "SP_TRUYVANLICHHEN_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  getAllDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      console.log(req.userRole);
      const params = null;
      const sp = "SP_XEMDANHSACHDICHVU_ALL";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  getAllCa: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = null;
      const sp = "SP_XEMCA_ALL";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  getAllDSNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = null;
      const sp = "SP_XEMDANHSACHNHASI_ALL";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  taoTKKH: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SODT = req.body.sdt;
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;
      params.NGAYSINH = req.body.ngaysinh;
      params.DIACHI = req.body.diachi;
      params.MATKHAU = req.body.matkhau;
      const sp = "SP_TAOTKKH_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  deleteLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }

      const params = {};
      params.MANS = req.body.mans;
      params.SODT = req.body.sdt;
      params.SOTT = req.body.stt;

      const sp = "SP_DELETELICHHEN_NV_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      if (error.message === "Lịch hẹn này không tồn tại") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Không thể hủy lịch hẹn trước 1 ngày") {
        return res.status(422).json({ error: error.message });
      }
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemBenhAn: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SODT = req.params.sdt;
      const sp = "SP_GETHSB1KH_NV_NS_KH";
      const result = await pool.executeSP(sp, params);
      const groupedResult = groupHSB(result[0]);
      return res.status(200).json(groupedResult);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  taoLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {
        SODT: req.body.sodt,
        MANS: req.body.mans,
        SOTT: req.body.sott,
        LYDOKHAM: req.body.lydokham,
      };
      console.log(params);
      const sp = "SP_DATLICHHEN_NV_KH";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ succes: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemLRChuaDatTatCaNSTheoNgay: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      const sp = "SP_LRCHUADATTATCANS_KH";
      const result = await pool.executeSP(sp, params);
      const formattedResult = result[0].map(item => ({
        MANS: item.MANS,
        HOTEN: item.HOTEN,
        SOTT: item.SOTT,
        MACA: item.MACA,
        NGAY: convertBackToDate(item.NGAY),
        GIOBATDAU: formatTime(item.GIOBATDAU),
        GIOKETTHUC: formatTime(item.GIOKETTHUC),
      }));
      const resultFiltered = filterRandomDentist(formattedResult);
      return res.status(200).json(resultFiltered);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
};
export default khachHangController;
