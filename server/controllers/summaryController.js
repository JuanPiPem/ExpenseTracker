// controllers/summaryController.js
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const getSummary = async (req, res) => {
  try {
    const [expenses, incomes] = await Promise.all([
      Expense.find({ userId: req.user.uid }),
      Income.find({ userId: req.user.uid }),
    ]);

    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
    const balance = totalIncome - totalExpenses;

    res.json({ totalExpenses, totalIncome, balance });
  } catch (error) {
    res.status(500).json({ error: "Error generating summary" });
  }
};
