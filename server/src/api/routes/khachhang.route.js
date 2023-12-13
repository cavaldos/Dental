import express from "express";
import khachHangController from "../controllers/khachhang.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ?
router.post("/taoKH",
    // authMiddleware.authenticateToken,
    khachHangController.taoTKKH);
 
router.get("/getAllCa",
    // authMiddleware.authenticateToken,
    khachHangController.getAllCa);

router.get("/getAllDV",
    // authMiddleware.authenticateToken,
    khachHangController.getAllDV);

router.get("/getAllDSNhaSi",
    // authMiddleware.authenticateToken,
    khachHangController.getAllDSNS);

router.get("/lichRanh",
    // authMiddleware.authenticateToken,
    khachHangController.xemLRChuaDatTatCaNS);

router.get("/loaiThuoc/:mathuoc",
    // authMiddleware.authenticateToken,
    khachHangController.xemThuoc);

router.get("/loaiDV/:madv",
    // authMiddleware.authenticateToken,
    khachHangController.xemDV);

router.get("/lichHen",
    // authMiddleware.authenticateToken,
    khachHangController.xemLichHen);

router.post("/lichHen",
    // authMiddleware.authenticateToken,
    khachHangController.taoLichHen);

router.get("/benhAn",
    // authMiddleware.authenticateToken,
    khachHangController.xemBenhAn);

router.delete("/lichHen",
    // authMiddleware.authenticateToken,
    khachHangController.deleteLichHen);

router.put("/",
    // authMiddleware.authenticateToken,
    khachHangController.capNhanThongTin);

router.get("/",
    // authMiddleware.authenticateToken,
    khachHangController.xemThongTin);


export default router;
