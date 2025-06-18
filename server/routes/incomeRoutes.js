// routes/incomeRoutes.js
import express from "express";
import {
  getIncomes,
  createIncome,
  deleteIncome,
} from "../controllers/incomeControllers.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { validateIncome, validateMongoId } from "../middlewares/validators.js";

const router = express.Router();

router.get("/", authenticateToken, getIncomes);
router.post("/", authenticateToken, validateIncome, createIncome);
router.delete("/:id", authenticateToken, validateMongoId, deleteIncome);

export default router;
