import { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "./TransactionList";

const IncomeList = ({ refresh }) => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/incomes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIncomes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching incomes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [refresh]);

  if (loading) return <p>Loading incomes...</p>;

  return <TransactionList title="Incomes" data={incomes} type="income" />;
};

export default IncomeList;
