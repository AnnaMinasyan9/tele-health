import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@shared/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DoctorPatientsHeaderProps {
  name: string;
  patientCount: number;
  onLogout: () => void;
}

export function DoctorPatientsHeader({
  name,
  patientCount,
  onLogout,
}: DoctorPatientsHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
      <View>
        <Text style={styles.greeting}>Hello, {name}</Text>
        <Text style={styles.count}>
          {patientCount} patient{patientCount !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onLogout}
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xxxl,
    paddingBottom: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: {
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  count: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
});
