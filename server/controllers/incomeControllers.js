// controllers/incomeControllers.js
import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = { userId: req.user.uid };

    if (projectId) {
      filter.projectId = projectId;
    }

    const incomes = await Income.find(filter).populate("projectId", "name");
    res.json(incomes);
  } catch (error) {
    console.error("getIncomes error:", error);
    res.status(500).json({ error: "Error fetching incomes" });
  }
};

export const getIncomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOne({
      _id: id,
      userId: req.user.uid,
    }).populate("projectId", "name");
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: "Error fetching income" });
  }
};

export const createIncome = async (req, res) => {
  const { description, amount, projectId, category } = req.body;
  try {
    const newIncome = new Income({
      description,
      amount,
      projectId,
      category,
      userId: req.user.uid,
    });
    await newIncome.save();
    const populatedIncome = await Income.findById(newIncome._id).populate(
      "projectId",
      "name"
    );
    res.status(201).json(populatedIncome);
  } catch (error) {
    res.status(500).json({ error: "Error creating income" });
  }
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { description, amount, projectId, category } = req.body;
  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { description, amount, projectId, category },
      { new: true }
    ).populate("projectId", "name");
    if (!updatedIncome) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: "Error updating income" });
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
