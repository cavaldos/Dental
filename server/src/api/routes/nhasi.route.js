import express from "express";
import nhaSiController from "../controllers/nhasi.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.post("/lichRanh",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.dangKyLichRanh);

router.delete("/lichRanh",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.huyLichRanh);

router.post("/benhAn",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.taoBenhAn);

router.post("/CTDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.themCTDV);

router.post("/CTThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.themCTTHUOC);

router.put("/matKhau",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.doiMatKhau);

router.get("/caDu2NguoiTruc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.xemCaDu2NguoiTruc);

router.get("/lichRanhChuaDuocDat",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.xemLichRanhChuaDuocDat);

router.get("/getAllThuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.getAllThuoc);

router.get("/getAllDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.getAllDV);

router.get("/getAllCa",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.getAllCa);

router.get("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.xemLichHen);

router.get("/getAllDSNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.getAllDSNS);

router.get("/benhAn/:sdt",
    authMiddleware.authenticateToken,
    authMiddleware.protected('NS'),
    nhaSiController.xemBenhAn);

export default router;
