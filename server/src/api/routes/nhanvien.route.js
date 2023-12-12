import express from "express";
import nhanVienController from "../controllers/nhanvien.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/lichRanhNS",
    authMiddleware.authenticateToken,
    nhanVienController.getLichRanhNS);

router.post("/khachHang",
    authMiddleware.authenticateToken,
    nhanVienController.taoTaiKhoanKH);

router.post("/hoaDon",
    authMiddleware.authenticateToken,
    nhanVienController.taoHoaDon);

router.put("/xacNhanHoaDon",
    authMiddleware.authenticateToken,
    nhanVienController.xacNhanThanhToan);

router.put("/matKhau",
    authMiddleware.authenticateToken,
    nhanVienController.doiMatKhau);

router.get("/getAllThuoc",
    authMiddleware.authenticateToken,
    nhanVienController.getAllThuoc);

router.get("/getAllDV",
    authMiddleware.authenticateToken,
    nhanVienController.getAllDV);

router.get("/getAllCa",
    authMiddleware.authenticateToken,
    nhanVienController.getAllCa);

router.get("/hoaDon/:sdt",
    authMiddleware.authenticateToken,
    nhanVienController.getHoaDon);

router.get("/benhAn/:sdt",
    authMiddleware.authenticateToken,
    nhanVienController.xemBenhAn);

router.get("/getAllDSNhaSi",
    authMiddleware.authenticateToken,
    nhanVienController.getAllDSNS);

router.delete("/lichHen",
    authMiddleware.authenticateToken,
    nhanVienController.deleteLichHen);


export default router;
