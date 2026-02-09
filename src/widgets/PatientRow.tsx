import { Ionicons } from "@expo/vector-icons";
import type { Patient } from "@shared/models";
import {
  colors,
  fontSizes,
  fontWeights,
  shadows,
  spacing,
  theme,
} from "@shared/theme";
import { Avatar } from "@shared/ui";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PatientRowProps {
  patient: Patient
  onPress?: () => void
}

export function PatientRow({ patient, onPress }: PatientRowProps) {
  return (
    <TouchableOpacity style={styles.card} onPressIn={onPress}>
      <Avatar name={patient.fullName} uri={patient.avatarUrl} size={44} />

      <View style={styles.content}>
        <Text style={styles.name}>{patient.fullName}</Text>
        <Text style={styles.sub}><Ionicons name="mail" size={16} color={colors.textSecondary} /> {patient.email}</Text>
        <Text style={styles.sub}><Ionicons name="call" size={16} color={colors.textSecondary} /> {patient.phone}</Text>
      </View>

      <Ionicons name="chevron-forward-outline" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: theme.radii.xl,
    padding: spacing.xxl,
    marginBottom: spacing.mdl,
    ...shadows.card,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    gap: spacing.xs
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
    alignItems: "center",
    gap: spacing.xs,
  },
  chevron: {
    fontSize: fontSizes.xxl,
    color: colors.textTertiary,
    marginLeft: spacing.md,
  },
});
