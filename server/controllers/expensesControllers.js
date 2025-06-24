import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = { userId: req.user.uid };

    if (projectId) {
      filter.projectId = projectId;
    }

    const expenses = await Expense.find(filter).populate("projectId", "name");
    res.json(expenses);
  } catch (error) {
    console.error("getExpenses error:", error);
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({
      _id: id,
      userId: req.user.uid,
    }).populate("projectId", "name");
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expense" });
  }
};

export const createExpense = async (req, res) => {
  const { description, amount, projectId, category } = req.body;
  try {
    const newExpense = new Expense({
      description,
      amount,
      projectId,
      category,
      userId: req.user.uid,
    });
    await newExpense.save();
    const populatedExpense = await Expense.findById(newExpense._id).populate(
      "projectId",
      "name"
    );
    res.status(201).json(populatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Error creating expense" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, projectId, category } = req.body;
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { description, amount, projectId, category },
      { new: true }
    ).populate("projectId", "name");
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
