import { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "./TransactionList";

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

  return <TransactionList title="Expenses" data={expenses} type="expense" />;
};

export default ExpenseList;
