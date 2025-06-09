import { useState } from "react";
import ExpenseList from "./components/ExpenseList.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAddExpense = () => {
    setRefresh(!refresh); // fuerza refetch en ExpenseList
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>
      <AddExpenseForm onAdd={handleAddExpense} />
      <ExpenseList refresh={refresh} />
    </div>
  );
};

export default App;
