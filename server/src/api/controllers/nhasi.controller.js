import { groupHSB, groupTableLich } from "../../utils/groupData.js";
import { poolConnect } from "../../config/db.mjs";
const pool = await poolConnect("NS");

const nhaSiController = {
  xemCaDu2NguoiTruc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.userId;
      const sp = "SP_XEMCADU2NGTRUC_NS";
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
      params.MANS = req.userId;
      const sp = "SP_XEMLICHHENNS_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  xemLichRanhChuaDuocDat: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.userId;
      const sp = "SP_LICHRANHCHUADUOCDAT_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  dangKyLichRanh: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.body.mans;
      params.MACA = req.body.maca;
      params.NGAY = req.body.ngay;

      const sp = "SP_DANGKYLR_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  huyLichRanh: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.body.mans;
      params.SOTT = req.body.stt;

      const sp = "SP_HUYLR_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  taoBenhAn: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.SoDienThoai = req.body.sdt;
      params.NgayKham = req.body.ngaykham;
      params.MaNS = req.body.mans;
      params.DanDo = req.body.DanDo;

      const sp = "SP_TAOBENHAN_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  themCTDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MaDV = req.body.madv;
      params.SOTT = req.body.stt;
      params.SoDienThoai = req.body.sdt;
      params.SoLuongDV = req.body.sldv;

      const sp = "SP_THEMCTDV_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  themCTTHUOC: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MATHUOC = req.body.mathuoc;
      params.SOTT = req.body.stt;
      params.SODT = req.body.sdt;
      params.SOLUONG = req.body.slthuoc;
      params.THOIDIEMDUNG = req.body.thoidiemdung;

      const sp = "SP_THEMCTTHUOC_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  doiMatKhau: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.userId;
      params.MATKHAUCU = req.body.matkhaucu;
      params.MATKHAUMOI = req.body.matkhaumoi;

      const sp = "SP_DOIMK_NS";
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.message === "Không tồn tại nha sĩ này") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Xác nhận mật khẩu sai") {
        return res.status(422).json({ error: error.message });
      }
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  getAllThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }

      const params = null;
      const sp = "SP_GETALLTHUOC_NV_QTV_NS";
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
  xemTableLichNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const params = {};
      params.MANS = req.params.mans;
      const sp1 = "SP_LICHRANHCHUADUOCDAT_NS";
      const sp2 = "SP_XEMLICHHENNS_NS";
      const sp3 = "SP_XEMCADU2NGTRUC_NS";

      // waiting
      const result1 = await pool.executeSP(sp1, params);
      // orderd
      const result2 = await pool.executeSP(sp2, params);
      // full
      const result3 = await pool.executeSP(sp3, params);

      // Gộp kết quả từ 3 phương thức thành một mảng
      let combinedResults = [...result1[0], ...result2[0], ...result3[0]];

      // Ánh xạ giá trị "STATUS" dựa trên stored procedure
      combinedResults = combinedResults.map((item) => {
        if (item.hasOwnProperty("STATUS")) {
          return item;
        } else {
          if (result1[0].includes(item)) {
            return { ...item, STATUS: "waiting" };
          } else if (result2[0].includes(item)) {
            return { ...item, STATUS: "ordered" };
          } else if (result3[0].includes(item)) {
            return { ...item, STATUS: "full" };
          } else {
            return item;
          }
        }
      });
      const groupedResult = groupTableLich(combinedResults)
      return res.status(200).json(groupedResult);
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
};
export default nhaSiController;
