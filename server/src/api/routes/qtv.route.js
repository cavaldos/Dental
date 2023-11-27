import express from "express";
import qtvController from "../controllers/qtv.controller.js";

const router = express.Router();

router.get("/getAllNhanVien", qtvController.getNV);
router.get("/getAllNhaSi", qtvController.getNS);
router.get("/getAllQTV", qtvController.getQTV);
router.get("/getAllKhachHang", qtvController.getKH);
export default router;
