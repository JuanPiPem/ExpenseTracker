import { useState } from "react";
import ExpenseList from "./components/ExpenseList.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAddExpense = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Expenses Tracker</h1>
      <AddExpenseForm onAdd={handleAddExpense} />
      <ExpenseList refresh={refresh} />
    </div>
  );
};

export default App;
