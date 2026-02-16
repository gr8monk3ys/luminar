"use client";

import { useSyncExternalStore, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) callback();
      };
      window.addEventListener("storage", handler);
      window.addEventListener(`storage:${key}`, callback);
      return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener(`storage:${key}`, callback);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ?? null;
    } catch {
      return null;
    }
  }, [key]);

  const getServerSnapshot = useCallback(() => null, []);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const storedValue: T = rawValue !== null
    ? (JSON.parse(rawValue) as T)
    : initialValue;

  const isLoaded = rawValue !== null || typeof window !== "undefined";

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const current = localStorage.getItem(key);
        const currentParsed: T = current
          ? (JSON.parse(current) as T)
          : initialValue;
        const valueToStore =
          value instanceof Function ? value(currentParsed) : value;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event(`storage:${key}`));
      } catch {
        // Storage unavailable
      }
    },
    [key, initialValue]
  );

  return [storedValue, setValue, isLoaded] as const;
}
