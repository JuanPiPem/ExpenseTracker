import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig.js";
import TransactionList from "./TransactionList.jsx";

const TransactionContainer = ({ type, refresh }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const endpoint = `/api/${type}s`;
  const title = type === "income" ? "Incomes" : "Expenses";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(endpoint);
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.error || `Error fetching ${type}s`);
        console.error(`Error fetching ${type}s:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refresh, endpoint, type]);

  if (loading) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading {type}s...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return <TransactionList title={title} data={transactions} type={type} />;
};

export default TransactionContainer;
