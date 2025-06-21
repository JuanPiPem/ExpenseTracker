import { useState } from "react";
import TransactionContainer from "../components/TransactionContainer.jsx";
import Navbar from "../components/Navbar.jsx";
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
        <TransactionContainer type="income" refresh={refresh} />
        <AddTransactionForm onAdd={handleAdd} />
        <TransactionContainer type="expense" refresh={refresh} />
      </div>
    </div>
  );
};

export default Home;
