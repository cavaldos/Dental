import express from "express";
import NhanVienController from "../controllers/nhanvien.controller.js";

const router = express.Router();

router.get("/lichRanh", NhanVienController.getLichRanhNS);
export default router;
