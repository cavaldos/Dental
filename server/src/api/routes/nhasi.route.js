import express from "express";
import NhaSiController from "../controllers/nhasi.controller.js";

const router = express.Router();
router.get("/getall", NhaSiController.getNhasi);

export default router;
