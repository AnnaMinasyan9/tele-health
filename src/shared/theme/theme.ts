import { colors } from "./colors";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { fontSizes, fontWeights, letterSpacings } from "./typography";

export const theme = {
  colors,
  spacing,
  fontSizes,
  fontWeights,
  letterSpacings,
  shadows,

  radii: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    xxl: 16,
    full: 9999,
  },
} as const;
