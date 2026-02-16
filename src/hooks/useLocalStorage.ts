"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // Use initial value
    }
    setIsLoaded(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // Storage unavailable
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoaded] as const;
}
