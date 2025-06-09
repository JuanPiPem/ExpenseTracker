import express from "express";
const router = express.Router();

// Temporal: base de datos en memoria (luego lo cambiamos a MongoDB)
let expenses = [];

// GET - Ver todos los gastos
router.get("/", (req, res) => {
  res.json(expenses);
});

// POST - Agregar un nuevo gasto
router.post("/", (req, res) => {
  const { description, amount } = req.body;

  if (!description || typeof amount !== "number") {
    return res
      .status(400)
      .json({ error: "Descripción y monto son requeridos" });
  }

  const newExpense = { description, amount };
  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

export default router;
