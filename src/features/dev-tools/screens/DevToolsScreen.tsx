import { UserRole } from "@shared/models";
import { selectCurrentUser, selectCurrentUserRole, switchRole } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import {
  fontSizes,
  fontWeights,
  spacing,
  useStyles,
  useTheme,
  type AppTheme,
} from "@shared/theme";
import { MainButton } from "@shared/ui";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function DevToolsScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectCurrentUserRole);
  const [error, setError] = useState<string | null>(null);

  const roleLabel = useMemo(() => {
    return role === UserRole.Doctor ? "Doctor" : "Patient";
  }, [role]);

  const switchTo = useCallback(
    async (nextRole: UserRole) => {
      setError(null);
      try {
        await dispatch(switchRole(nextRole)).unwrap();
        router.replace(nextRole === UserRole.Doctor ? "/doctor/patients" : "/patient/home");
      } catch (_) {
        setError("Failed to switch role");
      }
    },
    [dispatch, router]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.back, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Dev Tools</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current session</Text>
        <Text style={styles.meta}>User: {user?.username ?? "—"}</Text>
        <Text style={styles.meta}>Role: {roleLabel}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Switch role</Text>

        {!!error && <Text style={styles.error}>{error}</Text>}
        {
          role === UserRole.Doctor ? (
            <MainButton
              title="Switch to Patient"
              onPress={() => switchTo(UserRole.Patient)}
              style={styles.button}
            />
          ) : (
            <MainButton
              title="Switch to Doctor"
              onPress={() => switchTo(UserRole.Doctor)}
              style={styles.button}
            />
          )
        }
      </View>
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
      paddingHorizontal: spacing.xxl,
      gap: spacing.xxl,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerSpacer: { width: 48 },
    back: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semibold,
      width: 48,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: t.colors.textPrimary,
    },
    card: {
      backgroundColor: t.colors.surface,
      borderRadius: t.radii.xl,
      padding: spacing.xxl,
      borderWidth: 1,
      borderColor: t.colors.border,
      gap: spacing.md,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semibold,
      color: t.colors.textPrimary,
      marginBottom: spacing.xs,
    },
    meta: {
      fontSize: fontSizes.md,
      color: t.colors.textSecondary,
    },
    error: {
      fontSize: fontSizes.md,
      color: t.colors.error,
    },
    button: {
      marginTop: spacing.md,
    },
  });
}

