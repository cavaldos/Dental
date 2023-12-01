import express from "express";
import khachHangController from "../controllers/khachhang.controller.js";

const router = express.Router();

router.post("/taoKH", khachHangController.taoTKKH);
router.get("/getAllCa", khachHangController.getAllCa);
router.get("/getAllDV", khachHangController.getAllDV);
router.get("/getAllDSNhaSi", khachHangController.getAllDSNS);
router.get("/lichRanh", khachHangController.xemLRChuaDatTatCaNS);
router.get("/loaiThuoc/:mathuoc", khachHangController.xemThuoc);
router.get("/loaiDV/:madv", khachHangController.xemDV);
router.get("/lichHen/:sdt", khachHangController.xemLichHen);
router.get("/benhAn/:sdt", khachHangController.xemBenhAn);
router.put("/:sdt", khachHangController.capNhanThongTin);
router.get("/:sdt", khachHangController.xemThongTin);
router.delete("/lichHen", khachHangController.deleteLichHen);


export default router;
