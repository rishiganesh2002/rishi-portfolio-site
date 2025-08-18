"use client";

import React, { createContext, useContext, ReactNode } from "react";
import themeConfig from "../../public/config/theme.json";

// Define the theme structure
interface CustomColors {
  [key: string]: string;
}

interface FontFamily {
  heading: string;
  body: string;
}

interface ThemeConfig {
  textColor: string;
  backgroundColor: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  customColors: CustomColors;
  fontFamily: FontFamily;
}

// Create the context
const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={themeConfig as ThemeConfig}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export function useTheme(): ThemeConfig {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export type { ThemeConfig, CustomColors, FontFamily };
