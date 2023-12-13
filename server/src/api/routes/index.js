import KhachHangRoutes from "./khachhang.route.js";
import NhanVienRoutes from "./nhanvien.route.js";
import OnlineRoutes from "./online.route.js";
import NhasiRoutes from "./nhasi.route.js";
import QtvRoutes from "./qtv.route.js";
import authMiddleware from "../middleware/auth.js";

const routers = (app) => {
  app.use("/checklogin", (req, res) => {
    const result = {
      success: true,
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJRVFYwMDAxIiwidXNlclJvbGUiOiJRVFYiLCJpYXQiOjE3MDI0MzQ3MDUsImV4cCI6MTcwNTAyNjcwNX0.nhAnxrDxHf7CeDwKbHueR1uzJhs3bSXfZ5spNdewckk",
      info: {
        ROLE: "QTV",
        MAQTV: "QTV0001",
        HOTEN: "Vũ Thành Công",
        PHAI: "Nam",
      },
      accessokenExpirationTime: "30d",
    };
    
    res.json(result);
  });
  app.use("/qtv", QtvRoutes);
  app.use("/khachhang", KhachHangRoutes);
  app.use("/nhanvien", NhanVienRoutes);
  app.use("/online", OnlineRoutes);
  app.use("/nhasi", NhasiRoutes);
};
export default routers;
