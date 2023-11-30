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
  themThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.TENTHUOC = req.body.tenthuoc;
      params.DONVITINH = req.body.donvitinh;
      params.CHIDINH = req.body.chidinh;
      params.SLNHAP = req.body.slnhap;
      params.NGAYHETHAN = req.body.ngayhethan;
      params.DONGIA = req.body.dongia;

      const sp = 'SP_THEMLOAITHUOC_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  huyThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MATHUOC = req.body.mathuoc
      const sp = 'SP_HUYTHUOC_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  suaThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MATHUOC = req.body.mathuoc;
      params.TENTHUOC = req.body.tenthuoc;
      params.CHIDINH = req.body.chidinh;
      params.DONGIA = req.body.dongia;

      const sp = 'SP_CAPNHATLOAITHUOC_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  nhapThuoc: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MATHUOC = req.body.mathuoc;
      params.SOLUONGNHAP = req.body.slnhap;
      params.NGAYHETHAN = req.body.ngayhethan;

      const sp = 'SP_NHAPTHEMTHUOC_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  themDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.TENDV = req.body.tendv;
      params.CHITIET = req.body.mota;
      params.DONGIA = req.body.dongia;

      const sp = 'SP_THEMDICHVU_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  suaDV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MADV = req.body.madv;
      params.TENDV = req.body.tendv;
      params.CHITIET = req.body.mota;
      params.DONGIA = req.body.dongia;

      const sp = 'SP_CAPNHATDICHVU_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  themNhanVien: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;
      params.VITRICV = req.body.vitricv;

      const sp = 'SP_CREATENV_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  suaNV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANV = req.body.manv;
      params.VITRICV = req.body.vitricv;

      const sp = 'SP_UPDATENV_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  blockNhanVien: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANV = req.body.manv;

      const sp = 'SP_BLOCKNV_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  unblockNhanVien: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANV = req.body.manv;

      const sp = 'SP_UNBLOCKNV_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  themNhaSi: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;
      params.GIOITHIEU = req.body.gioithieu;

      const sp = 'SP_CREATENS_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  suaNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MANS = req.body.mans;
      params.GIOITHIEU = req.body.gioithieu;

      const sp = 'SP_UPDATENS_QTV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  blockNhaSi: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MA_NS = req.body.mans;

      const sp = 'SP_KHOA_TAI_KHOAN_NHA_SI';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  unblockNhaSi: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.MA_NS = req.body.mans;

      const sp = 'SP_MO_TAI_KHOAN_NHA_SI';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  themQTV: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.HOTEN = req.body.hoten;
      params.PHAI = req.body.phai;

      const sp = 'SP_TAO_QTV_MOI';
      const result = await pool.executeSP(sp, params);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  blockKH: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.body.sdt;

      const sp = 'SP_KHOA_TAI_KHOAN_KHACH_HANG';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  unblockKH: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = {};
      params.SODT = req.body.sdt;

      const sp = 'SP_MO_TAI_KHOAN_KHACH_HANG';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
};
export default qtvController;
