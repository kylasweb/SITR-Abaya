"use client";

import { useState, useEffect, useCallback } from 'react';

type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
};

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  initialValue: T
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialValue,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(() => {
    setState(prevState => ({ ...prevState, loading: true, error: null }));
    return asyncFunction()
      .then(response => {
        setState({ data: response, loading: false, error: null });
        return response;
      })
      .catch(error => {
        setState({ data: initialValue, loading: false, error: error });
        throw error;
      });
  }, [asyncFunction, initialValue]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute, refresh: execute };
}
