import express from "express";
import KhachHangController from "../controllers/khachhang.controller.js";

const router = express.Router();

router.get("/getall", KhachHangController.getKhachHang);

export default router;
