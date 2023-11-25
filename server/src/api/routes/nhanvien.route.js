import express from "express";
import NhanVienController from "../controllers/nhanvien.controller.js";

const router = express.Router();

router.get("/lichRanhNS", NhanVienController.getLichRanhNS);
router.post("/khachHang", NhanVienController.taoTaiKhoanKH);
router.post("/hoaDon", NhanVienController.taoHoaDon);
router.put("/xacNhanHoaDon", NhanVienController.xacNhanThanhToan);
router.puf("/matKhau", NhanVienController.doiMatKhau);
router.get("/hoaDon/:sdt", NhanVienController.getHoaDon);
export default router;
