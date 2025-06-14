import { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [refresh]);

  if (loading) return <p>Loading expenses...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.description} - ${exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
