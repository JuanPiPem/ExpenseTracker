import { useEffect } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { groupByDate } from "../utils/groupByDate";
import useTransactionStore from "../stores/transactionStore.js";

const TransactionTimeline = () => {
  const { incomes, expenses, loading, error, fetchIncomes, fetchExpenses } =
    useTransactionStore();

  useEffect(() => {
    // Fetch both incomes and expenses if not already loaded
    if (incomes.length === 0) fetchIncomes();
    if (expenses.length === 0) fetchExpenses();
  }, [fetchIncomes, fetchExpenses, incomes.length, expenses.length]);

  const isLoading = loading.incomes || loading.expenses;
  const hasError = error.incomes || error.expenses;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2 w-32"></div>
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div key={j} className="h-12 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error.incomes || error.expenses}
      </div>
    );
  }

  const transactions = [
    ...incomes.map((t) => ({ ...t, type: "income" })),
    ...expenses.map((t) => ({ ...t, type: "expense" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transactions found</p>
      </div>
    );
  }

  const grouped = groupByDate(transactions);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">{date}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={`${item._id || index}`}
                className={`flex justify-between items-center p-3 rounded shadow ${
                  item.type === "income"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.type === "income" ? (
                    <ArrowDownCircle className="text-green-600" />
                  ) : (
                    <ArrowUpCircle className="text-red-600" />
                  )}
                  <span className="font-medium">{item.description}</span>
                </div>
                <span className="font-bold">
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransactionTimeline;
