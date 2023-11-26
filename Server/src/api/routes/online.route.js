import express from "express";
import OnlineController from "../controllers/online.controller.js";

const router = express.Router();
router.get("/signin", OnlineController.signin);
router.get("/signup", OnlineController.signup);

export default router;
