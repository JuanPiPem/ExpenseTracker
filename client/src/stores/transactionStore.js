import { create } from "zustand";
import axiosInstance from "../api/axiosConfig.js";

const useTransactionStore = create((set, get) => ({
  // State
  incomes: [],
  expenses: [],
  summary: null,
  loading: {
    incomes: false,
    expenses: false,
    summary: false,
    timeline: false,
  },
  error: {
    incomes: "",
    expenses: "",
    summary: "",
    timeline: "",
  },
  view: "normal", // 'normal' or 'timeline'

  // Actions
  setView: (view) => set({ view }),

  // Fetch incomes
  fetchIncomes: async () => {
    set({
      loading: { ...get().loading, incomes: true },
      error: { ...get().error, incomes: "" },
    });
    try {
      const response = await axiosInstance.get("/api/incomes");
      set({
        incomes: Array.isArray(response.data) ? response.data : [],
        loading: { ...get().loading, incomes: false },
      });
    } catch (error) {
      set({
        error: {
          ...get().error,
          incomes: error.response?.data?.error || "Error fetching incomes",
        },
        loading: { ...get().loading, incomes: false },
      });
      console.error("Error fetching incomes:", error);
    }
  },

  // Fetch expenses
  fetchExpenses: async () => {
    set({
      loading: { ...get().loading, expenses: true },
      error: { ...get().error, expenses: "" },
    });
    try {
      const response = await axiosInstance.get("/api/expenses");
      set({
        expenses: Array.isArray(response.data) ? response.data : [],
        loading: { ...get().loading, expenses: false },
      });
    } catch (error) {
      set({
        error: {
          ...get().error,
          expenses: error.response?.data?.error || "Error fetching expenses",
        },
        loading: { ...get().loading, expenses: false },
      });
      console.error("Error fetching expenses:", error);
    }
  },

  // Fetch summary
  fetchSummary: async () => {
    set({
      loading: { ...get().loading, summary: true },
      error: { ...get().error, summary: "" },
    });
    try {
      const response = await axiosInstance.get("/api/summary");
      set({
        summary: response.data,
        loading: { ...get().loading, summary: false },
      });
    } catch (error) {
      set({
        error: {
          ...get().error,
          summary: error.response?.data?.error || "Error fetching summary",
        },
        loading: { ...get().loading, summary: false },
      });
      console.error("Error fetching summary:", error);
    }
  },

  // Add transaction
  addTransaction: async (type, transactionData) => {
    const endpoint = type === "income" ? "/api/incomes" : "/api/expenses";
    try {
      const response = await axiosInstance.post(endpoint, transactionData);

      // Add to local state
      if (type === "income") {
        set({ incomes: [...get().incomes, response.data] });
      } else {
        set({ expenses: [...get().expenses, response.data] });
      }

      // Refresh summary
      get().fetchSummary();

      return response.data;
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      throw error;
    }
  },

  // Refresh all data
  refreshAll: async () => {
    await Promise.all([
      get().fetchIncomes(),
      get().fetchExpenses(),
      get().fetchSummary(),
    ]);
  },

  // Get timeline data (merged incomes and expenses)
  getTimelineData: () => {
    const { incomes, expenses } = get();
    const merged = [
      ...incomes.map((t) => ({ ...t, type: "income" })),
      ...expenses.map((t) => ({ ...t, type: "expense" })),
    ];
    return merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Clear errors
  clearErrors: () =>
    set({ error: { incomes: "", expenses: "", summary: "", timeline: "" } }),
}));

export default useTransactionStore;
