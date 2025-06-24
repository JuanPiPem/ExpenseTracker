import Project from "../models/Project.js";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getProjectSummary = async (req, res) => {
  const { id: projectId } = req.params;
  console.log("getProjectSummary called with projectId:", projectId);
  console.log("User ID:", req.user.uid);

  try {
    // Verify project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.uid,
    });
    console.log("Project found:", project ? "Yes" : "No");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get incomes and expenses for this project
    const [incomes, expenses] = await Promise.all([
      Income.find({ projectId, userId: req.user.uid }),
      Expense.find({ projectId, userId: req.user.uid }),
    ]);

    console.log("Incomes found:", incomes.length);
    console.log("Expenses found:", expenses.length);

    // Calculate totals
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const balance = totalIncome - totalExpenses;

    // Group by category
    const incomeByCategory = incomes.reduce((acc, income) => {
      acc[income.category] = (acc[income.category] || 0) + income.amount;
      return acc;
    }, {});

    const expensesByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const response = {
      project,
      summary: {
        totalIncome,
        totalExpenses,
        balance,
        incomeByCategory,
        expensesByCategory,
        transactionCount: incomes.length + expenses.length,
      },
      incomes,
      expenses,
    };

    console.log("Sending response:", response);
    res.json(response);
  } catch (error) {
    console.error("getProjectSummary error:", error);
    res.status(500).json({ error: "Error fetching project summary" });
  }
};

export const getAllProjectsSummary = async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user.uid,
      isActive: true,
    });

    const projectsWithSummary = await Promise.all(
      projects.map(async (project) => {
        const [incomes, expenses] = await Promise.all([
          Income.find({ projectId: project._id, userId: req.user.uid }),
          Expense.find({ projectId: project._id, userId: req.user.uid }),
        ]);

        const totalIncome = incomes.reduce(
          (sum, income) => sum + income.amount,
          0
        );
        const totalExpenses = expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        const balance = totalIncome - totalExpenses;

        return {
          ...project.toObject(),
          summary: {
            totalIncome,
            totalExpenses,
            balance,
            transactionCount: incomes.length + expenses.length,
          },
        };
      })
    );

    res.json(projectsWithSummary);
  } catch (error) {
    console.error("getAllProjectsSummary error:", error);
    res.status(500).json({ error: "Error fetching projects summary" });
  }
};
