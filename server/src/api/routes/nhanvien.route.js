import express from "express";
import nhanVienController from "../controllers/nhanvien.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/lichRanhNS",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getLichRanhNS);

router.get("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getLichHenNS);

router.post("/khachHang",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.taoTaiKhoanKH);

router.post("/hoaDon",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.taoHoaDon);

router.put("/xacNhanHoaDon",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.xacNhanThanhToan);

router.put("/matKhau",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.doiMatKhau);

router.get("/getAllThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getAllThuoc);

router.get("/getAllDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getAllDV);

router.get("/getAllCa",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getAllCa);

router.get("/hoaDon/:sdt",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getHoaDon);

router.get("/benhAn/:sdt",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.xemBenhAn);

router.get("/getAllDSNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.getAllDSNS);

router.delete("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NV'),
    nhanVienController.deleteLichHen);


export default router;
