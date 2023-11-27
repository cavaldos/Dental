import { poolConnect } from "../../config/db.mjs";
import lodash from 'lodash';
const pool = await poolConnect('KH');



const khachHangController = {
  xemThongTin: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.params.sdt;
      const sp = 'SP_XEMTHONGTIN_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  capNhanThongTin: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = req.body;
      params.SODT = req.params.sdt;
      const sp = 'SP_CAPNHATTHONGTIN_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({success: true});
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xemLRChuaDatTatCaNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      console.log();
      const sp = 'SP_LRCHUADATTATCANS_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xemThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MA_THUOC = req.params.mathuoc;
      const sp = 'SP_TRUYVANLOAITHUOC_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xemDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MA_MADV = req.params.madv;
      const sp = 'SP_TRUYDICHVU_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  xemLichHen: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SDT = req.params.sdt;
      const sp = 'SP_TRUYVANLICHHEN_KH';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },

};
export default khachHangController;