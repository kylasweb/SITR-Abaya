"use client";

import { useState, useEffect, useCallback } from 'react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    return asyncFunction()
      .then(response => {
        setState({ data: response, loading: false, error: null });
        return response;
      })
      .catch(error => {
        setState({ data: null, loading: false, error: error });
        throw error;
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, refresh: execute };
}
