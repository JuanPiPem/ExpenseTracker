import { useState } from "react";
import ExpenseList from "../components/ExpenseList.jsx";
import Navbar from "../components/Navbar.jsx";
import IncomeList from "../components/IncomeList.jsx";
import AddTransactionForm from "../components/AddTransactionForm";

import SummaryCard from "../components/SummaryCard.jsx";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const handleAdd = () => setRefresh((prev) => !prev);

  return (
    <div className="p-8 font-sans">
      <Navbar />
      <SummaryCard refresh={refresh} />
      <div className="grid md:grid-cols-3 gap-6">
        <IncomeList refresh={refresh} />
        <AddTransactionForm onAdd={() => setRefresh(!refresh)} />{" "}
        <ExpenseList refresh={refresh} />
      </div>
    </div>
  );
};

export default Home;
