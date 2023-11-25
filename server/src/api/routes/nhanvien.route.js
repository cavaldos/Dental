import express from "express";
import nhanVienController from "../controllers/nhanvien.controller.js";

const router = express.Router();

router.get("/lichRanhNS", nhanVienController.getLichRanhNS);
router.post("/khachHang", nhanVienController.taoTaiKhoanKH);
router.post("/hoaDon", nhanVienController.taoHoaDon);
router.put("/xacNhanHoaDon", nhanVienController.xacNhanThanhToan);
router.put("/matKhau", nhanVienController.doiMatKhau);
router.get("/hoaDon/:sdt", nhanVienController.getHoaDon);
export default router;
