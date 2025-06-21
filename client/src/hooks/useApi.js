import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig.js";

export const useApi = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
        console.error(`Error fetching from ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      console.error(`Error refetching from ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mutate = async (endpoint, method = "POST", data = null) => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance[method.toLowerCase()](
        endpoint,
        data
      );
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
