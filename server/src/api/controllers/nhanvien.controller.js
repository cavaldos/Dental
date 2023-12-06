import { poolConnect } from "../../config/db.mjs";
const pool = await poolConnect('NV');
import { groupHD, groupHSB, groupLich } from "../../utils/groupData.js"

const nhanVienController = {
  getLichRanhNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_GETLICHRANHNS_NV';
      const result = await pool.executeSP(sp, params);
      const lichNS = {
        lichHen: groupLich(result[0]),
        lichRanh: groupLich(result[1]),
      };
      return res.status(200).json(lichNS);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  taoTaiKhoanKH: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.body.sdt;
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;
      params.NGAYSINH = req.body.ngaysinh;
      params.DIACHI = req.body.diachi;

      const sp = 'SP_TAOTKKH_NV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },

  taoHoaDon: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.body.sdt;
      params.SOTT = req.body.stt;
      params.MANV = req.body.manv;

      const sp = 'SP_TAOHOADON_NV';
      const result = await pool.executeSP(sp, params);
      const groupedResult = groupHD(result[0]);

      console.log(groupedResult);
      return res.status(201).json(groupedResult[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xacNhanThanhToan: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.body.sdt;
      params.SOTT = req.body.stt;

      const sp = 'SP_THANHTOANHOADON_NV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getHoaDon: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.params.sdt;
      const sp = 'SP_GETHOADON1KH_NV';
      const result = await pool.executeSP(sp, params);
      const groupedResult = groupHD(result[0]);
      return res.status(200).json(groupedResult);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  doiMatKhau: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANV = req.body.manv;
      params.MATKHAUCU = req.body.matkhaucu;
      params.MATKHAUMOI = req.body.matkhaumoi;

      const sp = 'SP_DOIMK_NV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getAllThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_GETALLTHUOC_NV_QTV_NS';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getAllDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEMDANHSACHDICHVU_ALL';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getAllCa: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEMCA_ALL';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getAllDSNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEMDANHSACHNHASI_ALL';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  deleteLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANS = req.body.mans;
      params.SODT = req.body.sdt;
      params.SOTT = req.body.stt;

      const sp = 'SP_DELETELICHHEN_NV_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xemBenhAn: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.params.sdt;
      const sp = 'SP_GETHSB1KH_NV_NS_KH';
      const result = await pool.executeSP(sp, params);
      const groupedResult = groupHSB(result[0]);
      return res.status(200).json(groupedResult);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  taoLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {
        SODT: req.userId,
        MANS: req.body.mans,
        SOTT: req.body.sott,
        LYDOKHAM: req.body.lydokham
      };
      const sp = 'SP_DATLICHHEN_NV_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ succes: true });

    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  }

};
export default nhanVienController;