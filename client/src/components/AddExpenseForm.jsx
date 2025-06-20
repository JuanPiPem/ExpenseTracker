import { useState } from "react";
import axios from "axios";

const AddExpenseForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/expenses",
        {
          description,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAdd(res.data);
      setDescription("");
      setAmount("");
    } catch (err) {
      console.error("Err when adding expense:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Expense Description"
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
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
