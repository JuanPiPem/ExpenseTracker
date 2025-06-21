import { List, Calendar } from "lucide-react";
import useTransactionStore from "../stores/transactionStore.js";

const ViewToggle = () => {
  const { view, setView } = useTransactionStore();

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-gray-100 rounded-lg p-1 flex">
        <button
          onClick={() => setView("normal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            view === "normal"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-sm font-medium">Normal View</span>
        </button>
        <button
          onClick={() => setView("timeline")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            view === "timeline"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Timeline View</span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
