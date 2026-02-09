import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  spacing,
} from "@shared/theme";
import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";

interface SectionHeaderProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export function SectionHeader({ title, style }: SectionHeaderProps) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.mdl,
    textTransform: "uppercase",
    letterSpacing: letterSpacings.wide,
  },
});
