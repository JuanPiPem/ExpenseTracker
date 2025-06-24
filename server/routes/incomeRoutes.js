// routes/incomeRoutes.js
import express from "express";
import {
  getIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeControllers.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { validateIncome, validateMongoId } from "../middlewares/validators.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/incomes - Get all incomes for the user
router.get("/", getIncomes);

// GET /api/incomes/:id - Get a specific income
router.get("/:id", getIncomeById);

// POST /api/incomes - Create a new income
router.post("/", validateIncome, createIncome);

// PUT /api/incomes/:id - Update an income
router.put("/:id", updateIncome);

// DELETE /api/incomes/:id - Delete an income
router.delete("/:id", validateMongoId, deleteIncome);

export default router;
