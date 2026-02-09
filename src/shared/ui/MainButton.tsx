import { colors, fontSizes, fontWeights, spacing, theme } from "@shared/theme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from "react-native";

interface MainButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function MainButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: MainButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.disabled, style]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={colors.textOnPrimary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: theme.radii.lg,
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: colors.textOnPrimary,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
});
