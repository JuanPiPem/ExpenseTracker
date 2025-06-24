import { create } from "zustand";
import axiosInstance from "../api/axiosConfig.js";

const useTransactionStore = create((set, get) => ({
  // State
  incomes: [],
  expenses: [],
  summary: null,
  projects: [],
  currentProject: null,
  loading: {
    incomes: false,
    expenses: false,
    summary: false,
    projects: false,
    timeline: false,
  },
  error: {
    incomes: "",
    expenses: "",
    summary: "",
    projects: "",
    timeline: "",
  },
  view: "normal", // 'normal' or 'timeline'

  // Actions
  setView: (view) => set({ view }),
  setCurrentProject: (project) => set({ currentProject: project }),

  // Fetch projects
  fetchProjects: async () => {
    set({
      loading: { ...get().loading, projects: true },
      error: { ...get().error, projects: "" },
    });
    try {
      const response = await axiosInstance.get("/api/projects/summary");
      set({
        projects: response.data,
        loading: { ...get().loading, projects: false },
      });
    } catch (error) {
      set({
        error: {
          ...get().error,
          projects: error.response?.data?.error || "Error fetching projects",
        },
        loading: { ...get().loading, projects: false },
      });
      console.error("Error fetching projects:", error);
    }
  },

  // Create project
  createProject: async (projectData) => {
    set({
      loading: { ...get().loading, projects: true },
      error: { ...get().error, projects: "" },
    });
    try {
      const response = await axiosInstance.post("/api/projects", projectData);
      set({
        projects: [response.data, ...get().projects],
        loading: { ...get().loading, projects: false },
      });
      return response.data;
    } catch (error) {
      set({
        error: {
          ...get().error,
          projects: error.response?.data?.error || "Error creating project",
        },
        loading: { ...get().loading, projects: false },
      });
      throw error;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    set({
      loading: { ...get().loading, projects: true },
      error: { ...get().error, projects: "" },
    });
    try {
      const response = await axiosInstance.put(
        `/api/projects/${projectId}`,
        projectData
      );
      set({
        projects: get().projects.map((p) =>
          p._id === projectId ? response.data : p
        ),
        loading: { ...get().loading, projects: false },
      });
      return response.data;
    } catch (error) {
      set({
        error: {
          ...get().error,
          projects: error.response?.data?.error || "Error updating project",
        },
        loading: { ...get().loading, projects: false },
      });
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    set({
      loading: { ...get().loading, projects: true },
      error: { ...get().error, projects: "" },
    });
    try {
      await axiosInstance.delete(`/api/projects/${projectId}`);
      set({
        projects: get().projects.filter((p) => p._id !== projectId),
        loading: { ...get().loading, projects: false },
      });
    } catch (error) {
      set({
        error: {
          ...get().error,
          projects: error.response?.data?.error || "Error deleting project",
        },
        loading: { ...get().loading, projects: false },
      });
      throw error;
    }
  },

  // Fetch incomes
  fetchIncomes: async (projectId = null) => {
    set({
      loading: { ...get().loading, incomes: true },
      error: { ...get().error, incomes: "" },
    });
    try {
      const url = projectId
        ? `/api/incomes?projectId=${projectId}`
        : "/api/incomes";
      const response = await axiosInstance.get(url);
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
  fetchExpenses: async (projectId = null) => {
    set({
      loading: { ...get().loading, expenses: true },
      error: { ...get().error, expenses: "" },
    });
    try {
      const url = projectId
        ? `/api/expenses?projectId=${projectId}`
        : "/api/expenses";
      const response = await axiosInstance.get(url);
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
  fetchSummary: async (projectId = null) => {
    set({
      loading: { ...get().loading, summary: true },
      error: { ...get().error, summary: "" },
    });
    try {
      let url;
      if (projectId) {
        url = `/api/projects/${projectId}/summary`;
        console.log("Fetching project summary for:", projectId);
      } else {
        url = "/api/summary";
        console.log("Fetching general summary");
      }

      const response = await axiosInstance.get(url);
      console.log("Summary response:", response.data);

      // For project summary, extract the summary object from the response
      const summaryData = projectId ? response.data.summary : response.data;

      set({
        summary: summaryData,
        loading: { ...get().loading, summary: false },
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      set({
        error: {
          ...get().error,
          summary: error.response?.data?.error || "Error fetching summary",
        },
        loading: { ...get().loading, summary: false },
      });
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
      get().fetchSummary(transactionData.projectId);

      return response.data;
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      throw error;
    }
  },

  // Refresh all data
  refreshAll: async (projectId = null) => {
    await Promise.all([
      get().fetchIncomes(projectId),
      get().fetchExpenses(projectId),
      get().fetchSummary(projectId),
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
    set({
      error: {
        incomes: "",
        expenses: "",
        summary: "",
        projects: "",
        timeline: "",
      },
    }),
}));

export default useTransactionStore;
