import React, { useState, useEffect } from "react";

export const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiData = async (endpoint) => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { fetchApiData, loading, error };
};
