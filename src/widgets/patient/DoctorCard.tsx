import type { Doctor } from "@shared/models";
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  shadows,
  spacing,
  theme,
  useStyles,
  useTheme,
  type AppTheme,
} from "@shared/theme";
import { Avatar } from "@shared/ui";
import { StyleSheet, Text, View } from "react-native";

interface DoctorCardProps {
  doctor: Doctor;
  label?: string;
}

export function DoctorCard({ doctor, label }: DoctorCardProps) {
  const { colors } = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View style={styles.card}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.row}>
        <Avatar
          name={doctor.fullName}
          uri={doctor.avatarUrl}
          size={80}
          bg={colors.successLight}
          color={colors.success}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.fullName}</Text>
          <Text style={styles.email}>{doctor.specialty}</Text>
        </View>
      </View>
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: t.colors.surface,
      borderRadius: theme.radii.xl,
      padding: spacing.xxl,
      ...shadows.card,
    },
    label: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      color: t.colors.success,
      letterSpacing: letterSpacings.wider,
      marginBottom: spacing.mdl,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.lg,
    },
    info: { flex: 1 },
    name: {
      fontSize: fontSizes.body,
      fontWeight: fontWeights.semibold,
      color: t.colors.textPrimary,
    },
    email: {
      fontSize: fontSizes.md,
      color: t.colors.textSecondary,
      marginTop: spacing.xxs,
    },
  });
}
