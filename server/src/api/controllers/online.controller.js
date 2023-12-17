import { poolConnect } from "../../config/db.mjs";
import jwt from "jsonwebtoken";

const pool = await poolConnect("KHONLINE");

const onlineController = {
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
      console.log(params);
      try {
        checkSoDTParams = {
          SODT: req.body.sdt,
        };
        const checkSoDT = await pool.executeSP("SP_KTTK_ALL", checkSoDTParams);
        if (checkSoDT[0][0].ROLE) {
          return res
            .status(400)
            .json({ message: "The phone number is registered!" });
        }
      } catch (error) {
        const sp = "SP_TAOTKKH_KH";
        const result = await pool.executeSP(sp, params);
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  },
  dangnhap: async (req, res) => {
    try {
      if (!pool) {
        return res.status(500).json({ error: "Khong the ket noi db" });
      }
      const sp = "SP_DANGNHAP_ALL";
      const params = {};
      params.MATK = req.body.matk;
      params.MATKHAU = req.body.matkhau;
      console.log(req.body);
      const result = await pool.executeSP(sp, params);
      if (result.error) {
        if (result.error.message === "Tài khoản đăng nhập không hợp lệ.") {
          return res.status(401).json({ error: error.message });
        }
        if (result.error.message === "Tài khoản hoặc mật khẩu không đúng.") {
          return res.status(401).json({ error: error.message });
        }
        if (result.error.message === "Tài khoản đã bị khóa.") {
          return res.status(403).json({ error: error.message });
        }
        // return res.status(401).json(result.error);
      } else {
        if (result[0]._DAKHOA) {
          return res.status(403).json("Tài khoản đã bị khóa.");
        }
        const accessToken = jwt.sign(
          {
            userId: params.MATK,
            userRole: result[0][0].ROLE,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );
        return res.status(200).json({
          success: true,
          accessToken: accessToken,
          info: result[0][0],
          accessokenExpirationTime: process.env.ACCESS_TOKEN_LIFE,
        });
      }
    } catch (error) {
      if (error.message === "Tài khoản đăng nhập không hợp lệ.") {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === "Tài khoản hoặc mật khẩu không đúng.") {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === "Tài khoản đã bị khóa.") {
        return res.status(403).json({ error: error.message });
      }
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
};
export default onlineController;
