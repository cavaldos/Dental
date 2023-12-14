import express from "express";
import nhanVienController from "../controllers/nhanvien.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

<<<<<<< HEAD
router.get("/lichRanhNS",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getLichRanhNS);

router.post("/khachHang",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.taoTaiKhoanKH);

router.post("/hoaDon",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.taoHoaDon);

router.put("/xacNhanHoaDon",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.xacNhanThanhToan);

router.put("/matKhau",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.doiMatKhau);

router.get("/getAllThuoc",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getAllThuoc);

router.get("/getAllDV",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getAllDV);

router.get("/getAllCa",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getAllCa);

router.get("/hoaDon/:sdt",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getHoaDon);

router.get("/benhAn/:sdt",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.xemBenhAn);

router.get("/getAllDSNhaSi",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.getAllDSNS);

router.delete("/lichHen",
    // authMiddleware.authenticateToken,
    // authMiddleware.protected('NV'),
    nhanVienController.deleteLichHen);

=======
router.get("/lichRanhNS", nhanVienController.getLichRanhNS);
router.post("/khachHang", nhanVienController.taoTaiKhoanKH);
router.post("/hoaDon", nhanVienController.taoHoaDon);
router.put("/xacNhanHoaDon", nhanVienController.xacNhanThanhToan);
router.put("/matKhau", nhanVienController.doiMatKhau);
router.get("/getAllThuoc", nhanVienController.getAllThuoc);
router.get("/getAllDV", nhanVienController.getAllDV);
router.get("/getAllCa", nhanVienController.getAllCa);
router.get("/hoaDon/:sdt", nhanVienController.getHoaDon);
router.get("/benhAn/:sdt", nhanVienController.xemBenhAn);
router.get("/getAllDSNhaSi", nhanVienController.getAllDSNS);
router.delete("/lichHen", nhanVienController.deleteLichHen);
>>>>>>> f79e7f3d9f5c9aec3450f9339a3d6c9b0524e5b5

export default router;
