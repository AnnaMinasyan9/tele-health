export const palette = {
  indigo100: "#e0e7ff",
  indigo600: "#4f46e5",

  green50: "#f0fdf4",
  green600: "#16a34a",
  green700: "#15803d",

  red600: "#dc2626",

  orange500: "#f97316",
  yellow100: "#fef3c7",

  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",

  dark: "#1a1a2e",
  white: "#ffffff",
  black: "#000000",
} as const;

export type Colors = {
  // Backgrounds
  background: string;
  surface: string;

  // Primary
  primary: string;
  primaryLight: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnPrimary: string;
  textInput: string;

  // Borders
  border: string;
  borderInput: string;

  // States
  error: string;
  success: string;
  successDark: string;
  successLight: string;
  warning: string;
  accent: string;

  // Placeholder
  placeholder: string;

  // Shadow
  shadow: string;

  // Tab bar
  tabActive: string;
  tabInactive: string;
};

export const lightColors: Colors = {
  // Backgrounds
  background: palette.gray100,
  surface: palette.white,

  // Primary
  primary: palette.indigo600,
  primaryLight: palette.indigo100,

  // Text
  textPrimary: palette.dark,
  textSecondary: palette.gray500,
  textTertiary: palette.gray400,
  textOnPrimary: palette.white,
  textInput: palette.gray900,

  // Borders
  border: palette.gray200,
  borderInput: palette.gray300,

  // States
  error: palette.red600,
  success: palette.green600,
  successDark: palette.green700,
  successLight: palette.green50,
  warning: palette.orange500,
  accent: palette.yellow100,

  // Placeholder
  placeholder: palette.gray400,

  // Shadow
  shadow: palette.black,

  // Tab bar
  tabActive: palette.indigo600,
  tabInactive: palette.gray400,
};

export const darkColors: Colors = {
  // Backgrounds
  background: "#0B1220",
  surface: "#111827",

  // Primary
  primary: palette.indigo600,
  primaryLight: "#1F2A44",

  // Text
  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textTertiary: "#9CA3AF",
  textOnPrimary: palette.white,
  textInput: "#F9FAFB",

  // Borders
  border: "#1F2937",
  borderInput: "#374151",

  // States
  error: "#EF4444",
  success: "#22C55E",
  successDark: "#16A34A",
  successLight: "#0B2A1B",
  warning: "#FB923C",
  accent: "#3B2F12",

  // Placeholder
  placeholder: "#6B7280",

  // Shadow
  shadow: palette.black,

  // Tab bar
  tabActive: palette.indigo600,
  tabInactive: "#6B7280",
};

// Back-compat: existing code may import `colors`.
export const colors = lightColors;
