// routes/summaryRoutes.js
import express from "express";
import { getSummary } from "../controllers/summaryController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, getSummary);

export default router;
