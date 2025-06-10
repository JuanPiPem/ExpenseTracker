import { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("/api/expenses");

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
      <h2>Expenses</h2>
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
