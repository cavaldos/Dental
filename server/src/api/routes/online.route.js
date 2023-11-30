import express from "express";
import OnlineController from "../controllers/online.controller.js";

const router = express.Router();
router.post("/taoKH", OnlineController.taoTKKH);


export default router;
