import express from "express";
import nhaSiController from "../controllers/nhasi.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.post("/lichRanh",
    // authMiddleware.authenticateToken,
    nhaSiController.dangKyLichRanh);

router.delete("/lichRanh",
    // authMiddleware.authenticateToken,
    nhaSiController.huyLichRanh);

router.post("/benhAn",
    // authMiddleware.authenticateToken,
    nhaSiController.taoBenhAn);

router.post("/CTDV",
    // authMiddleware.authenticateToken,
    nhaSiController.themCTDV);

router.post("/CTThuoc",
    // authMiddleware.authenticateToken,
    nhaSiController.themCTTHUOC);

router.put("/matKhau",
    // authMiddleware.authenticateToken,
    nhaSiController.doiMatKhau);

router.get("/caDu2NguoiTruc",
    // authMiddleware.authenticateToken,
    nhaSiController.xemCaDu2NguoiTruc);

router.get("/lichRanhChuaDuocDat",
    // authMiddleware.authenticateToken,
    nhaSiController.xemLichRanhChuaDuocDat);

router.get("/getAllThuoc",
    // authMiddleware.authenticateToken,
    nhaSiController.getAllThuoc);

router.get("/getAllDV",
    // authMiddleware.authenticateToken,
    nhaSiController.getAllDV);

router.get("/getAllCa",
    // authMiddleware.authenticateToken,
    nhaSiController.getAllCa);

router.get("/lichHen",
    // authMiddleware.authenticateToken,
    nhaSiController.xemLichHen);

router.get("/getAllDSNhaSi",
    // authMiddleware.authenticateToken,
    nhaSiController.getAllDSNS);

router.get("/benhAn/:sdt",
    // authMiddleware.authenticateToken,
    nhaSiController.xemBenhAn);

export default router;
