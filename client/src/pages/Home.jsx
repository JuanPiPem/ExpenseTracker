import { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Navbar from "../components/Navbar.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import IncomeList from "../components/IncomeList.jsx";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const handleAdd = () => setRefresh((prev) => !prev);

  return (
    <div className="p-8 font-sans">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <AddExpenseForm onAdd={handleAdd} />
          <ExpenseList refresh={refresh} />
        </div>
        <div>
          <AddIncomeForm onAdd={handleAdd} />
          <IncomeList refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Home;
