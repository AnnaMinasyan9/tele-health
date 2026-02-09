import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@shared/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PatientHomeHeaderProps {
  name: string;
  onLogout: () => void;
}

export function PatientHomeHeader({
  name,
  onLogout,
}: PatientHomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
      <View>
        <Text style={styles.greeting}>Hello, {name}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onLogout}
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
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.primary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  logoutText: {
    fontSize: fontSizes.lg,
    color: colors.error,
    fontWeight: fontWeights.semibold,
  },
});
