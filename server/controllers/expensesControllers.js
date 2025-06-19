import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    console.log("User ID:", req.user?.uid);
    const expenses = await Expense.find({ userId: req.user.uid });
    res.json(expenses);
  } catch (error) {
    console.error("getExpenses error:", error);
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ _id: id, userId: req.user.uid });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expense" });
  }
};

export const createExpense = async (req, res) => {
  const { description, amount } = req.body;
  try {
    const newExpense = new Expense({
      description,
      amount,
      userId: req.user.uid,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Error creating expense" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { description, amount },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Error updating expense" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: id,
      userId: req.user.uid,
    });
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting expense" });
  }
};
