const palette = {
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


export const colors = {
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
} as const;
