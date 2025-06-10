import { useState } from "react";
import axios from "axios";

const AddExpenseForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    try {
      const res = await axios.post("/api/expenses", {
        description,
        amount: parseFloat(amount),
      });
      onAdd(res.data); // notifica al padre
      setDescription("");
      setAmount("");
    } catch (err) {
      console.error("Error al agregar gasto:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddExpenseForm;
