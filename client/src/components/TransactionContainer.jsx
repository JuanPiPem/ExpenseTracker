import { useEffect } from "react";
import TransactionList from "./TransactionList.jsx";
import useTransactionStore from "../stores/transactionStore.js";

const TransactionContainer = ({ type }) => {
  const {
    incomes,
    expenses,
    loading,
    error,
    fetchIncomes,
    fetchExpenses,
    currentProject,
  } = useTransactionStore();

  const data = type === "income" ? incomes : expenses;
  const isLoading = type === "income" ? loading.incomes : loading.expenses;
  const errorMessage = type === "income" ? error.incomes : error.expenses;
  const fetchData = type === "income" ? fetchIncomes : fetchExpenses;
  const title = type === "income" ? "Incomes" : "Expenses";

  useEffect(() => {
    fetchData(currentProject?._id);
  }, [fetchData, currentProject?._id]);

  if (isLoading) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading {type}s...</span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      </div>
    );
  }

  return <TransactionList title={title} data={data} type={type} />;
};

export default TransactionContainer;
