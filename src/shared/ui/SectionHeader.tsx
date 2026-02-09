import {
  fontSizes,
  fontWeights,
  letterSpacings,
  spacing,
  useStyles,
  type AppTheme,
} from "@shared/theme";
import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";

interface SectionHeaderProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export function SectionHeader({ title, style }: SectionHeaderProps) {
  const styles = useStyles(createStyles);

  return <Text style={[styles.title, style]}>{title}</Text>;
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    title: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semibold,
      color: t.colors.textSecondary,
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xxxl,
      paddingBottom: spacing.mdl,
      textTransform: "uppercase",
      letterSpacing: letterSpacings.wide,
    },
  });
}
