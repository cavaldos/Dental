import express from "express";
import qtvController from "../controllers/qtv.controller.js";

const router = express.Router();

router.get("/getAllNhanVien", qtvController.getNV);
router.get("/getAllNhaSi", qtvController.getNS);
router.get("/getAllQTV", qtvController.getQTV);
router.get("/getAllKhachHang", qtvController.getKH);
router.get("/getAllThuoc", qtvController.getAllThuoc);
router.get("/getAllDV", qtvController.getAllDV);
router.get("/getAllCa", qtvController.getAllCa);
router.get("/getAllDSNhaSi", qtvController.getAllDSNS);



export default router;
