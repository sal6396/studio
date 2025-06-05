
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Theme = "light" | "dark" | "system";

interface AdminThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark"; // What is currently applied (light or dark)
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  // Initialize state with a default, useEffect will update from localStorage
  const [theme, _setTheme] = useState<Theme>("system"); 
  // resolvedTheme indicates what is actually active (light/dark), considering 'system'
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Callback to apply the theme to the DOM and update resolvedTheme state
  const applyThemeToDom = useCallback((currentThemeSetting: Theme) => {
    const root = window.document.documentElement;
    let isEffectivelyDark: boolean;

    if (currentThemeSetting === "system") {
      isEffectivelyDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isEffectivelyDark = currentThemeSetting === "dark";
    }

    setResolvedTheme(isEffectivelyDark ? "dark" : "light");

    if (isEffectivelyDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Effect for initializing theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("admin-theme") as Theme | null;
    const initialUserSetting = storedTheme && ["light", "dark", "system"].includes(storedTheme) 
      ? storedTheme 
      : "system";
    _setTheme(initialUserSetting); // Set internal state for user's choice
    applyThemeToDom(initialUserSetting); // Apply it to DOM
  }, [applyThemeToDom]);

  // Effect for when user explicitly changes theme (via setTheme call)
  useEffect(() => {
    applyThemeToDom(theme); // Apply the new user choice to DOM
    localStorage.setItem("admin-theme", theme); // Persist user's choice
  }, [theme, applyThemeToDom]);

  // Listener for system theme changes (e.g., OS theme changes)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") { // Only re-apply if current mode is 'system'
        applyThemeToDom("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme, applyThemeToDom]); // Rerun if user changes away from/to 'system'

  const setTheme = (newThemeChoice: Theme) => {
    _setTheme(newThemeChoice); // Update user's choice, triggers the effect above
  };

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
}
