import express from "express";
import qtvController from "../controllers/qtv.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllNhanVien",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getNV);

router.get("/getAllNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getNS);

router.get("/getAllQTV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getQTV);

router.get("/getAllKhachHang",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getKH);

router.get("/getAllThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getAllThuoc);

router.get("/getAllDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getAllDV);

router.get("/getAllCa",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getAllCa);

router.get("/getAllDSNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.getAllDSNS);

router.post("/themThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.themThuoc);

router.post("/themDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.themDV);

router.put("/nhapThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.nhapThuoc);

router.delete("/xoaThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.huyThuoc);

router.put("/suaThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.suaThuoc);

router.put("/suaDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.suaDV);

router.put("/nhanVien",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.suaNV);

router.post("/nhanVien",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.themNhanVien);

router.put("/blockNhanVien",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.blockNhanVien);

router.put("/unblockNhanVien",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.unblockNhanVien);

router.post("/nhasi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.themNhaSi);

router.put("/nhasi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.suaNS);

router.put("/blockNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.blockNhaSi);

router.put("/unblockNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.unblockNhaSi);

router.post("/themQTV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.themQTV);

router.put("/blockKH",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.blockKH);

router.put("/unblockKH",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.unblockKH);

router.put("/matKhau",
    authMiddleware.authenticateToken,
    authMiddleware.protected('QTV'),
    qtvController.doiMatKhau);



export default router;
