import { poolConnect } from "../../config/db.mjs";
const pool = await poolConnect('NV');

const nhanVienController = {
  getLichRanhNS: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: 'Khong the ket noi db' });
      }
      const params = null;
      const sp = 'SP_GETLICHRANHNS_NV';
      const result = await pool.executeSP(sp, params);
      return res.status(200).json(result);
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  },
  


};
export default nhanVienController;