import { useState } from "react";
import axiosInstance from "../api/axiosConfig.js";
import { ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react";

const AddTransactionForm = ({ onAdd }) => {
  const [type, setType] = useState("Income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    setLoading(true);
    setError("");

    const endpoint = type === "Income" ? "/api/incomes" : "/api/expenses";

    try {
      const res = await axiosInstance.post(endpoint, {
        description,
        amount: parseFloat(amount),
      });

      onAdd(res.data);
      setDescription("");
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add transaction");
      console.error("Error adding transaction:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6 space-y-4"
    >
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setType("Income")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            type === "Income"
              ? "bg-green-100 text-green-700 font-semibold"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <ArrowDownCircle className="w-5 h-5" />
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("Expense")}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            type === "Expense"
              ? "bg-red-100 text-red-700 font-semibold"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <ArrowUpCircle className="w-5 h-5" />
          Expense
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Description"
        className="w-full border rounded p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full border rounded p-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        disabled={loading}
        min="0"
        step="0.01"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Adding..." : `Add ${type}`}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
