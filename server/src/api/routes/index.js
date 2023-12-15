import KhachHangRoutes from "./khachhang.route.js";
import NhanVienRoutes from "./nhanvien.route.js";
import OnlineRoutes from "./online.route.js";
import NhasiRoutes from "./nhasi.route.js";
import QtvRoutes from "./qtv.route.js";
import authMiddleware from "../middleware/auth.js";

const routers = (app) => {
  app.get(
    "/checklogin",
     authMiddleware.authenticateToken,
    (req, res) => {
      res.json({ message: "ok" });
    }
  );
  app.use(
    "/qtv",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected("QTV"),
    QtvRoutes
  );
  app.use(
    "/khachhang",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected("KH"),
    KhachHangRoutes
  );
  app.use(
    "/nhanvien",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected("NV"),
    NhanVienRoutes
  );
  app.use("/online", OnlineRoutes);
  app.use(
    "/nhasi",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected("NS"),
    NhasiRoutes
  );
};
export default routers;
