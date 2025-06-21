import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import axiosInstance from "../api/axiosConfig.js";

const SummaryCard = ({ refresh }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get("/api/summary");
        setSummary(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching summary");
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [refresh]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 my-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-xl shadow animate-pulse"
          >
            <div className="h-8 w-8 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded my-6">
        {error}
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded my-6">
        No summary data available
      </div>
    );
  }

  const balance = summary.totalIncome - summary.totalExpenses;

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="bg-green-100 p-4 rounded-xl shadow text-center">
        <ArrowDownCircle className="mx-auto text-green-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Income</p>
        <p className="text-lg font-bold text-green-700">
          ${summary.totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
        <DollarSign className="mx-auto text-blue-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Balance</p>
        <p
          className={`text-lg font-bold ${
            balance >= 0 ? "text-blue-700" : "text-red-700"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded-xl shadow text-center">
        <ArrowUpCircle className="mx-auto text-red-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Expenses</p>
        <p className="text-lg font-bold text-red-700">
          ${summary.totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
