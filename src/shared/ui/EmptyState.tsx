import { colors, fontSizes, fontWeights, spacing } from "@shared/theme";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: spacing.jumboXxl,
    paddingHorizontal: spacing.jumboLg,
  },
  icon: {
    fontSize: fontSizes.icon,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSizes.base,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
