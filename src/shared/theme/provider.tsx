import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

import { darkColors, lightColors, type Colors } from "./colors";
import { theme as baseTheme } from "./theme";

export type AppColorScheme = "light" | "dark";

export type AppTheme = typeof baseTheme & {
  colors: Colors;
  colorScheme: AppColorScheme;
};

const ThemeContext = createContext<AppTheme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceScheme = useColorScheme();
  const colorScheme: AppColorScheme = deviceScheme === "dark" ? "dark" : "light";

  const value = useMemo<AppTheme>(() => {
    const colors = colorScheme === "dark" ? darkColors : lightColors;
    return {
      ...baseTheme,
      colors,
      colorScheme,
    };
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): AppTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function useStyles<TStyles>(
  factory: (theme: AppTheme) => TStyles,
  deps: readonly unknown[] = []
): TStyles {
  const theme = useTheme();
  return useMemo(() => factory(theme), [theme.colorScheme, ...deps]);
}

