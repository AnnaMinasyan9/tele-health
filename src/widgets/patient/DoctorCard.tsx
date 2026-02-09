import type { Doctor } from "@shared/models";
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  shadows,
  spacing,
  theme,
} from "@shared/theme";
import { Avatar } from "@shared/ui";
import { StyleSheet, Text, View } from "react-native";

interface DoctorCardProps {
  doctor: Doctor;
  label?: string;
}

export function DoctorCard({ doctor, label }: DoctorCardProps) {
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: theme.radii.xl,
    padding: spacing.xxl,
    ...shadows.card,
  },
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    color: colors.success,
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
    color: colors.textPrimary,
  },
  email: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
});
