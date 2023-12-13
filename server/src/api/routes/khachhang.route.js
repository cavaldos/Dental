import express from "express";
import khachHangController from "../controllers/khachhang.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ?
router.post("/taoKH",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.taoTKKH);

router.get("/getAllCa",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.getAllCa);

router.get("/getAllDV",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.getAllDV);

router.get("/getAllDSNhaSi",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.getAllDSNS);

router.get("/lichRanh",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemLRChuaDatTatCaNS);

router.get("/loaiThuoc/:mathuoc",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemThuoc);

router.get("/loaiDV/:madv",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemDV);

router.get("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemLichHen);

router.post("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.taoLichHen);

router.get("/benhAn",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemBenhAn);

router.delete("/lichHen",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.deleteLichHen);

router.put("/",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.capNhanThongTin);

router.get("/",
    authMiddleware.authenticateToken,
    authMiddleware.protected('KH'),
    khachHangController.xemThongTin);


export default router;
