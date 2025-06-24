import { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react";
import useTransactionStore from "../stores/transactionStore.js";

const AddTransactionForm = () => {
  const [type, setType] = useState("Income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("other");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addTransaction, currentProject } = useTransactionStore();

  const incomeCategories = [
    { value: "contribution", label: "Contribución" },
    { value: "refund", label: "Reembolso" },
    { value: "payment", label: "Pago" },
    { value: "other", label: "Otro" },
  ];

  const expenseCategories = [
    { value: "food", label: "Comida" },
    { value: "transport", label: "Transporte" },
    { value: "accommodation", label: "Alojamiento" },
    { value: "entertainment", label: "Entretenimiento" },
    { value: "supplies", label: "Suministros" },
    { value: "other", label: "Otro" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    setLoading(true);
    setError("");

    try {
      const transactionData = {
        description,
        amount: parseFloat(amount),
        category,
        ...(currentProject && { projectId: currentProject._id }),
      };

      await addTransaction(type.toLowerCase(), transactionData);

      setDescription("");
      setAmount("");
      setCategory("other");
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

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded p-2"
        disabled={loading}
      >
        {(type === "Income" ? incomeCategories : expenseCategories).map(
          (cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          )
        )}
      </select>

      {currentProject && (
        <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
          Proyecto: {currentProject.name}
        </div>
      )}

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
