import { Ionicons } from "@expo/vector-icons";
import {
  fontSizes,
  fontWeights,
  spacing,
  useStyles,
  useTheme,
  type AppTheme,
} from "@shared/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PatientHomeHeaderProps {
  name: string;
  onLogout: () => void;
  onDevTools: () => void;
}

export function PatientHomeHeader({
  name,
  onLogout,
  onDevTools,
}: PatientHomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
      <View>
        <Text style={styles.greeting}>Hello, {name}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onDevTools}
          accessibilityRole="button"
          accessibilityLabel="Dev Tools"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
        >
          <Ionicons name="bug-outline" size={22} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: t.colors.surface,
      paddingHorizontal: spacing.xxxl,
      paddingBottom: spacing.xxl,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.border,
    },
    greeting: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: t.colors.primary,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.lg,
    },
    logoutText: {
      fontSize: fontSizes.lg,
      color: t.colors.error,
      fontWeight: fontWeights.semibold,
    },
  });
}
