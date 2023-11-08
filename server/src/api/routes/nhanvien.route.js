import express from "express";
import NhanVienController from "../controllers/nhanvien.controller.js";

const router = express.Router();

router.get("/getall", NhanVienController.getnhanvien);
export default router;
