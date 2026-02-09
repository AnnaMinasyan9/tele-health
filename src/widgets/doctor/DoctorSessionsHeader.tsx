import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  spacing,
} from "@shared/theme";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DoctorSessionsHeaderProps {
  sessionCount: number;
}

export function DoctorSessionsHeader({ sessionCount }: DoctorSessionsHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.title}>Sessions</Text>
      {sessionCount > 0 && (
        <Text style={styles.count}>
          {sessionCount} upcoming session{sessionCount !== 1 ? "s" : ""}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xxxl,
    paddingBottom: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  count: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
    textTransform: "uppercase",
    letterSpacing: letterSpacings.wide,
  },
});
