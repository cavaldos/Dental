import express from "express";
import qtvController from "../controllers/qtv.controller.js";

const router = express.Router();

router.get("/getall", qtvController.getqtv);


export default router;
