import { Ionicons } from "@expo/vector-icons";
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  spacing,
  theme,
  useStyles,
  useTheme,
  type AppTheme,
} from "@shared/theme";
import { Avatar } from "@shared/ui";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PatientProfileCardProps {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  doctorName?: string;
}

export function PatientProfileCard({
  name,
  email,
  phone,
  avatarUrl,
  doctorName,
}: PatientProfileCardProps) {
  const { colors } = useTheme();
  const styles = useStyles(createStyles);

  function handleEmailPress() {
    Linking.openURL(`mailto:${email}`);
  }

  function handlePhonePress() {
    const cleaned = phone.replace(/[^+\d]/g, "");
    Linking.openURL(`tel:${cleaned}`);
  }
  return (
    <View style={styles.card}>
      <Avatar name={name} uri={avatarUrl} size={72} />
      <Text style={styles.name}>{name}</Text>

      <View style={styles.contactRow}>
        <TouchableOpacity
          onPress={handleEmailPress}
          style={styles.contactChip}
          activeOpacity={0.6}
        >
          <Ionicons name="mail-outline" size={fontSizes.xl} color={colors.primary} />
          <Text style={styles.contactText} numberOfLines={1}>
            {email}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePhonePress}
          style={styles.contactChip}
          activeOpacity={0.6}
        >
          <Ionicons name="call-outline" size={fontSizes.xl} color={colors.primary} />
          <Text style={styles.contactText}>{phone}</Text>
        </TouchableOpacity>
      </View>

      {doctorName && (
        <View style={styles.doctorBadge}>
          <Text style={styles.doctorLabel}>Doctor</Text>
          <Text style={styles.doctorName}>{doctorName}</Text>
        </View>
      )}
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    card: {
      backgroundColor: t.colors.surface,
      alignItems: "center",
      paddingVertical: spacing.jumbo,
      paddingHorizontal: spacing.xxxl,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.border,
    },
    name: {
      fontSize: fontSizes.xxl,
      fontWeight: fontWeights.bold,
      color: t.colors.textPrimary,
      marginTop: spacing.xl,
    },

    // ── Contact row ──
    contactRow: {
      marginTop: spacing.lg,
      gap: spacing.md,
      alignItems: "center",
    },
    contactChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    contactIcon: {
      fontSize: fontSizes.base,
      lineHeight: fontSizes.xl,
    },
    contactText: {
      fontSize: fontSizes.base,
      color: t.colors.primary,
      fontWeight: fontWeights.medium,
    },

    // ── Doctor badge ──
    doctorBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: t.colors.successLight,
      borderRadius: theme.radii.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      marginTop: spacing.xl,
    },
    doctorLabel: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semibold,
      color: t.colors.success,
      marginRight: spacing.sm,
      textTransform: "uppercase",
      letterSpacing: letterSpacings.wide,
    },
    doctorName: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      color: t.colors.successDark,
    },
  });
}
