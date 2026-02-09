import { fontSizes, fontWeights, spacing, useStyles, type AppTheme } from "@shared/theme";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
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
      color: t.colors.textPrimary,
    },
    subtitle: {
      fontSize: fontSizes.base,
      color: t.colors.textTertiary,
      marginTop: spacing.xs,
      textAlign: "center",
    },
  });
}
