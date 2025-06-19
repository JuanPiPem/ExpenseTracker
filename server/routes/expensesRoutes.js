import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} from "../controllers/expensesControllers.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { validateExpense, validateMongoId } from "../middlewares/validators.js";
const router = express.Router();

router.get("/", authenticateToken, getExpenses);

router.get("/:id", authenticateToken, validateMongoId, getExpenseById);

router.post("/", authenticateToken, validateExpense, createExpense);

router.put(
  "/:id",
  authenticateToken,
  validateMongoId,
  validateExpense,
  updateExpense
);

router.delete("/:id", authenticateToken, validateMongoId, deleteExpense);

export default router;
