import express from "express";
import OnlineController from "../controllers/online.controller.js";

const router = express.Router();
router.post("/taoKH", OnlineController.taoTKKH);
router.get("/dangnhap", OnlineController.dangnhap);
router.get("/getAllDV", OnlineController.getAllDV);
router.get("/getAllDSNhaSi", OnlineController.getAllDSNS);



export default router;
