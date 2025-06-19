import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Incomes</h2>
      <ul>
        {incomes.map((inc, index) => (
          <li key={index}>
            {inc.description} - ${inc.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
