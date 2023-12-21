import jwt from "jsonwebtoken";
import { getPool } from "../../config/db.mjs";
const pool =  getPool("KHONLINE");
const authMiddleware = {
  authenticateToken: async (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Khong tim thay access token!" });
    }
    const accessToken = authorizationHeader.replace("Bearer ", "");
    try {
      const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
      const decodedToken = jwt.verify(accessToken, secret);
      console.log("deco token", decodedToken);
      if (!decodedToken) {
        return res.status(401).json({ message: "Token khong hop le!" });
      }
      if (!decodedToken.userId || !decodedToken.userRole) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      try {
        const params = {
          MATK: decodedToken.userId,
        };
        const result = await pool.executeSP("SP_KTTK_ALL", params);
        if (result[0][0].ROLE != decodedToken.userRole) {
          return res.status(401).json({ message: "Wrong role" });
        }
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Wrong ID or the account is blocked" });
      }
      req.userId = decodedToken.userId;
      req.userRole = decodedToken.userRole;
      next();
    } catch (error) {
      res.status(500).json({ message: "Token expired" });
    }
  },
  protected: (requireRole) => (req, res, next) => {
    if (req.userId === requireRole) {
      next();
    } else
      return res
        .status(403)
        .send("Protected route")
        .json({ message: "Protected route" });
  },
};
export default authMiddleware;
