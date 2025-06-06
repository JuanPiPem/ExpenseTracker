import express from "express";
const router = express.Router();

// Ejemplo temporal
router.get("/", (req, res) => {
  res.send("Expenses endpoint");
});

export default router;
