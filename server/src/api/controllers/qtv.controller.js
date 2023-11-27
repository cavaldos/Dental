import { poolConnect } from "../../config/db.mjs";
const pool = await poolConnect('QTV');

const qtvController = {
  getNV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEMDANHSACHNHANVIEN';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_GETALLNS_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getQTV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEM_DANH_SACH_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  getKH: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_XEM_DANH_SACH_KHACH_HANG';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result[0]);
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
};
export default qtvController;
