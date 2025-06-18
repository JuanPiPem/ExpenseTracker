// controllers/incomeControllers.js
import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.uid });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching incomes" });
  }
};

export const createIncome = async (req, res) => {
  const { description, amount } = req.body;
  try {
    const newIncome = new Income({
      description,
      amount,
      userId: req.user.uid,
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: "Error creating income" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await Income.findOneAndDelete({
      _id: id,
      userId: req.user.uid,
    });
    if (!deletedIncome) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting income" });
  }
};
