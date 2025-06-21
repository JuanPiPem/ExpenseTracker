import TransactionContainer from "../components/TransactionContainer.jsx";
import Navbar from "../components/Navbar.jsx";
import AddTransactionForm from "../components/AddTransactionForm";
import SummaryCard from "../components/SummaryCard.jsx";
import ViewToggle from "../components/ViewToggle.jsx";
import TransactionTimeline from "../components/TransactionTimeline.jsx";
import useTransactionStore from "../stores/transactionStore.js";

const Home = () => {
  const { view } = useTransactionStore();

  return (
    <div className="p-8 font-sans">
      <Navbar />
      <SummaryCard />
      <ViewToggle />

      {view === "normal" ? (
        <div className="grid md:grid-cols-3 gap-6">
          <TransactionContainer type="income" />
          <AddTransactionForm />
          <TransactionContainer type="expense" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Transaction Timeline
            </h2>
            <TransactionTimeline />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
