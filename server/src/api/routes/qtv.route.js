import express from "express";
import qtvController from "../controllers/qtv.controller.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/getAllNhanVien",qtvController.getNV);
router.get("/getAllNhaSi",qtvController.getNS);
router.get("/getAllQTV",qtvController.getQTV);
router.get("/getAllKhachHang",qtvController.getKH);
router.get("/getAllThuoc",qtvController.getAllThuoc);
router.get("/getAllDV",qtvController.getAllDV);
router.get("/getAllCa",qtvController.getAllCa);
router.get("/getAllDSNhaSi",qtvController.getAllDSNS);
router.post("/themThuoc",qtvController.themThuoc);
router.post("/themDV",qtvController.themDV);
router.put("/nhapThuoc",qtvController.nhapThuoc);
router.delete("/xoaThuoc",qtvController.huyThuoc);
router.put("/suaThuoc",qtvController.suaThuoc);
router.put("/suaDV",qtvController.suaDV);
router.put("/nhanVien",qtvController.suaNV);
router.post("/nhanVien",qtvController.themNhanVien);
router.put("/blockNhanVien",qtvController.blockNhanVien);
router.put("/unblockNhanVien",qtvController.unblockNhanVien);
router.post("/nhasi",qtvController.themNhaSi);
router.put("/nhasi",qtvController.suaNS);
router.put("/blockNhaSi",qtvController.blockNhaSi);
router.put("/unblockNhaSi",qtvController.unblockNhaSi);
router.post("/themQTV",qtvController.themQTV);
router.put("/blockKH",qtvController.blockKH);
router.put("/unblockKH",qtvController.unblockKH);
router.put("/matKhau",qtvController.doiMatKhau);


export default router;
