import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} from "../controllers/expensesControllers.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { validateExpense } from "../middlewares/validator.js";
const router = express.Router();

router.get("/", authenticateToken, getExpenses);

router.get("/:id", authenticateToken, getExpenseById);

router.post("/", authenticateToken, validateExpense, createExpense);

router.put("/:id", authenticateToken, validateExpense, updateExpense);

router.delete("/:id", authenticateToken, deleteExpense);

export default router;
