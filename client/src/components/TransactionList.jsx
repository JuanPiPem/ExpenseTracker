import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const TransactionList = ({ title, data = [], type }) => {
  const isIncome = type === "income";

  const categoryLabels = {
    // Income categories
    contribution: "Contribución",
    refund: "Reembolso",
    payment: "Pago",
    // Expense categories
    food: "Comida",
    transport: "Transporte",
    accommodation: "Alojamiento",
    entertainment: "Entretenimiento",
    supplies: "Suministros",
    other: "Otro",
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <ul className="space-y-3">
        {data.map((item, index) => (
          <li
            key={item._id || index}
            className={`flex items-center justify-between p-3 rounded-lg shadow ${
              isIncome ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {isIncome ? (
                <ArrowDownCircle className="text-green-600" />
              ) : (
                <ArrowUpCircle className="text-red-600" />
              )}
              <div>
                <span className="text-gray-800 font-medium block">
                  {item.description}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="bg-gray-200 px-2 py-1 rounded">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  {item.projectId && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {item.projectId.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span
              className={`font-bold ${
                isIncome ? "text-green-700" : "text-red-700"
              }`}
            >
              ${item.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No {type} transactions found</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
