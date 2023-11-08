import KhachHangRoutes from './khachhang.route.js';
import NhanVienRoutes from './nhanvien.route.js';
import OnlineRoutes from './online.route.js';
import NhasiRoutes from './nhasi.route.js';
import QtvRoutes from "./qtv.route.js";


const routers = (app) => {
    app.use("/qtv", QtvRoutes);
    app.use("/khachhang", KhachHangRoutes);
    app.use("/nhanvien", NhanVienRoutes);
    app.use("/online", OnlineRoutes);
    app.use("/nhasi", NhasiRoutes);
    }
export default routers;

