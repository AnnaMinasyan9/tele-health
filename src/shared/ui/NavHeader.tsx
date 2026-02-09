import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "@shared/theme";
import { StyleSheet, Text, TouchableOpacity, View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavHeaderProps {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function NavHeader({ title, onBack, right, style }: NavHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }, style]}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        activeOpacity={0.6}
      >
        <Ionicons
          name="chevron-back"
          size={fontSizes.xxl}
          color={colors.primary}
        />       
         <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSlot}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    justifyContent: "center",
  },
  backIcon: {
    fontSize: fontSizes.hero,
    color: colors.primary,
    lineHeight: 28,
    marginRight: spacing.xxs,
  },
  backText: {
    fontSize: fontSizes.body,
    color: colors.primary,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.xxl,
  },
  title: {
    flex: 1,
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: "center",
  },
  rightSlot: {
    minWidth: 60,
    alignItems: "flex-end",
  },
});
