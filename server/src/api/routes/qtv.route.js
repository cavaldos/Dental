import express from "express";
import qtvController from "../controllers/qtv.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllNhanVien",
    authMiddleware.authenticateToken,
    qtvController.getNV);

router.get("/getAllNhaSi",
    authMiddleware.authenticateToken,
    qtvController.getNS);

router.get("/getAllQTV",
    authMiddleware.authenticateToken,
    qtvController.getQTV);

router.get("/getAllKhachHang",
    authMiddleware.authenticateToken,
    qtvController.getKH);

router.get("/getAllThuoc",
    // authMiddleware.authenticateToken,
    qtvController.getAllThuoc);

router.get("/getAllDV",
    // authMiddleware.authenticateToken,
    qtvController.getAllDV);

router.get("/getAllCa",
    // authMiddleware.authenticateToken,
    qtvController.getAllCa);

router.get("/getAllDSNhaSi",
    // authMiddleware.authenticateToken,
    qtvController.getAllDSNS);

router.post("/themThuoc",
    // authMiddleware.authenticateToken,
    qtvController.themThuoc);

router.post("/themDV",
    // authMiddleware.authenticateToken,
    qtvController.themDV);

router.put("/nhapThuoc",
    // authMiddleware.authenticateToken,
    qtvController.nhapThuoc);

router.delete("/xoaThuoc",
    // authMiddleware.authenticateToken,
    qtvController.huyThuoc);

router.put("/suaThuoc",
    // authMiddleware.authenticateToken,
    qtvController.suaThuoc);

router.put("/suaDV",
    // authMiddleware.authenticateToken,
    qtvController.suaDV);

router.put("/nhanVien",
    // authMiddleware.authenticateToken,
    qtvController.suaNV);

router.post("/nhanVien",
    // authMiddleware.authenticateToken,
    qtvController.themNhanVien);

router.put("/blockNhanVien",
    // authMiddleware.authenticateToken,
    qtvController.blockNhanVien);

router.put("/unblockNhanVien",
    // authMiddleware.authenticateToken,
    qtvController.unblockNhanVien);

router.post("/nhasi",
    // authMiddleware.authenticateToken,
    qtvController.themNhaSi);

router.put("/nhasi",
    // authMiddleware.authenticateToken,
    qtvController.suaNS);

router.put("/blockNhaSi",
    // authMiddleware.authenticateToken,
    qtvController.blockNhaSi);

router.put("/unblockNhaSi",
    // authMiddleware.authenticateToken,
    qtvController.unblockNhaSi);

router.post("/themQTV",
    // authMiddleware.authenticateToken,
    qtvController.themQTV);

router.put("/blockKH",
    // authMiddleware.authenticateToken,
    qtvController.blockKH);

router.put("/unblockKH",
    // authMiddleware.authenticateToken,
    qtvController.unblockKH);

router.put("/matKhau",
    // authMiddleware.authenticateToken,
    qtvController.doiMatKhau);



















export default router;
