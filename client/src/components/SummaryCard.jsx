import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import axios from "axios";

const SummaryCard = ({ refresh }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [refresh]);

  if (loading || !summary) return <p>Loading summary...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="bg-green-100 p-4 rounded-xl shadow text-center">
        <ArrowUpCircle className="mx-auto text-green-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Income</p>
        <p className="text-lg font-bold text-green-700">
          ${summary.totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
        <DollarSign className="mx-auto text-blue-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Balance</p>
        <p className="text-lg font-bold text-blue-700">
          ${(summary.totalIncome - summary.totalExpenses).toFixed(2)}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded-xl shadow text-center">
        <ArrowDownCircle className="mx-auto text-red-600" size={32} />
        <p className="text-sm text-gray-600 mt-2">Expenses</p>
        <p className="text-lg font-bold text-red-700">
          ${summary.totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
