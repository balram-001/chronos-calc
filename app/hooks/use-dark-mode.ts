"use client";

import { useState } from "react";

const STORAGE_KEY = "chronos-calc-theme";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode((currentMode) => {
      const nextMode = !currentMode;
      window.localStorage.setItem(STORAGE_KEY, nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  return { darkMode, toggleDarkMode };
}
