import express from "express";
import khachHangController from "../controllers/khachhang.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ?
router.post("/taoKH",khachHangController.taoTKKH);
router.get("/getAllCa",khachHangController.getAllCa);
router.get("/getAllDV",khachHangController.getAllDV);
router.get("/getAllDSNhaSi",khachHangController.getAllDSNS);
router.get("/lichRanh",khachHangController.xemLRChuaDatTatCaNS);
router.get("/loaiThuoc/:mathuoc",khachHangController.xemThuoc);
router.get("/loaiDV/:madv",khachHangController.xemDV);
router.get("/lichHen",khachHangController.xemLichHen);
router.post("/lichHen",khachHangController.taoLichHen);
router.get("/benhAn",khachHangController.xemBenhAn);
router.delete("/xoalichHen",khachHangController.deleteLichHen);
router.put("/capnhatKH",khachHangController.capNhanThongTin);
router.get("/xemthongtinKH",khachHangController.xemThongTin);

export default router;
