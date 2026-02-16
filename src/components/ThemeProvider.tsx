"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  useCallback,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(t: Theme): "light" | "dark" {
  return t === "system" ? getSystemTheme() : t;
}

// External store for theme to work with useSyncExternalStore
let currentTheme: Theme = "system";
const listeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getThemeSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "system";
}

function setThemeStore(t: Theme) {
  currentTheme = t;
  listeners.forEach((l) => l());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const resolved = resolveTheme(theme);
  const mountedRef = useRef(false);

  // On mount, read from localStorage and apply
  useEffect(() => {
    const saved = localStorage.getItem("luminar-theme") as Theme | null;
    const initial = saved || "system";
    currentTheme = initial;
    const r = resolveTheme(initial);
    document.documentElement.classList.toggle("dark", r === "dark");
    mountedRef.current = true;
    // Notify subscribers
    listeners.forEach((l) => l());

    // Listen for system theme changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (currentTheme === "system") {
        const r = resolveTheme("system");
        document.documentElement.classList.toggle("dark", r === "dark");
        listeners.forEach((l) => l());
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeStore(t);
    localStorage.setItem("luminar-theme", t);
    const r = resolveTheme(t);
    document.documentElement.classList.toggle("dark", r === "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
