import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const TransactionList = ({ title, data = [], type }) => {
  const isIncome = type === "income";

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <ul className="space-y-3">
        {data.map((item, index) => (
          <li
            key={index}
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
              <span className="text-gray-800 font-medium">
                {item.description}
              </span>
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
    </div>
  );
};

export default TransactionList;
