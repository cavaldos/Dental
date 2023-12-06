import express from "express";
import khachHangController from "../controllers/khachhang.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/taoKH", khachHangController.taoTKKH);
router.get("/getAllCa", khachHangController.getAllCa);
router.get("/getAllDV", khachHangController.getAllDV);
router.get("/getAllDSNhaSi", khachHangController.getAllDSNS);
router.get("/lichRanh", khachHangController.xemLRChuaDatTatCaNS);
router.get("/loaiThuoc/:mathuoc", khachHangController.xemThuoc);
router.get("/loaiDV/:madv", khachHangController.xemDV);
// Chỗ này add thử nè
router.get("/lichHen",authMiddleware.authenticateToken, khachHangController.xemLichHen);
// Chỗ này add thử nè
router.post("/lichHen",authMiddleware.authenticateToken, khachHangController.xemLichHen);
// Chỗ này add thử nè
router.get("/benhAn",authMiddleware.authenticateToken, khachHangController.xemBenhAn);
router.delete("/lichHen", khachHangController.deleteLichHen);
// Chỗ này add thử nè
router.put("/",authMiddleware.authenticateToken, khachHangController.capNhanThongTin);
// Chỗ này add thử nè
router.get("/",authMiddleware.authenticateToken, khachHangController.xemThongTin);


export default router;
