import { useState } from "react";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const handleAdd = () => setRefresh((prev) => !prev);

  return (
    <div className="p-8 font-sans">
      <Navbar />
      <AddExpenseForm onAdd={handleAdd} />
      <ExpenseList refresh={refresh} />
    </div>
  );
};

export default Home;
