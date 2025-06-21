import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { groupByDate } from "../utils/groupByDate";

const TransactionTimeline = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");

        const [incomeRes, expenseRes] = await Promise.all([
          axios.get("/api/incomes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const merged = [
          ...incomeRes.data.map((t) => ({ ...t, type: "income" })),
          ...expenseRes.data.map((t) => ({ ...t, type: "expense" })),
        ];

        // Ordenar por fecha descendente
        merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setTransactions(merged);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p>Loading timeline...</p>;

  const grouped = groupByDate(transactions);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">{date}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded shadow ${
                  item.type === "income"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.type === "income" ? (
                    <ArrowDownCircle className="text-green-600" />
                  ) : (
                    <ArrowUpCircle className="text-red-600" />
                  )}
                  <span className="font-medium">{item.description}</span>
                </div>
                <span className="font-bold">
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransactionTimeline;
