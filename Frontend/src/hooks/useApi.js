import { useState, useCallback } from 'react';
import api from '../services/api';

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (options = {}) => {
    const abortController = new AbortController();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(endpoint, {
        ...options,
        signal: abortController.signal,
      });
      
      // Use requestAnimationFrame to prevent layout thrashing
      requestAnimationFrame(() => {
        setData(response.data);
        setLoading(false);
      });
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      }
    }

    return () => abortController.abort();
  }, [endpoint]);

  return { data, loading, error, fetchData };
};