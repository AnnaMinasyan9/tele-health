import { useAppDispatch } from "@shared/store";
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  shadows,
  spacing,
  theme,
} from "@shared/theme";

import { MainButton, TextField } from "@shared/ui";
import { useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@shared/store/auth";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../model/loginSchema";

const DEMO = {
  doctor: { username: "dr.john.smith", password: "doctor" },
  patient: { username: "anna.brown", password: "patient" },
} as const;

type DemoRole = keyof typeof DEMO;

export function LoginScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const canSubmit = isValid && !isSubmitting;

  const clearRootErrorIfAny = useCallback(() => {
    if (errors.root) clearErrors("root");
  }, [errors.root, clearErrors]);

  const applyDemo = useCallback(
    (role: DemoRole) => {
      const credentials = DEMO[role];
      setValue("username", credentials.username, { shouldValidate: true });
      setValue("password", credentials.password, { shouldValidate: true });
      clearErrors();
    },
    [setValue, clearErrors]
  );

  const applyDemoDoctor = useCallback(() => applyDemo("doctor"), [applyDemo]);
  const applyDemoPatient = useCallback(() => applyDemo("patient"), [applyDemo]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(login(values));
    } catch (e) {
      setError("root", {
        type: "server",
        message: e instanceof Error ? e.message : "Login failed",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Telehealth</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Controller
          control={control}
          name="username"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextField
                placeholder="username"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={(v: string) => {
                  onChange(v);
                  clearRootErrorIfAny();
                }}
                onBlur={onBlur}
                returnKeyType="next"
                error={!!errors.username}
                errorMessage={errors.username?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <TextField
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={(v: string) => {
                  onChange(v);
                  clearRootErrorIfAny();
                }}
                onBlur={onBlur}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </>
          )}
        />

        {!!errors.root?.message && (
          <Text style={styles.error}>{errors.root.message}</Text>
        )}

        <MainButton
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!canSubmit}
          style={styles.button}
        />

        <View style={styles.hint}>
          <Text style={styles.hintTitle}>Demo Credentials</Text>

          <TouchableOpacity onPress={applyDemoDoctor}>
            <Text style={styles.hintCred}>Doctor: {DEMO.doctor.username}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={applyDemoPatient}>
            <Text style={styles.hintCred}>Patient: {DEMO.patient.username}</Text>
          </TouchableOpacity>

          <Text style={styles.hintPassword}>Password: {DEMO.doctor.password}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    paddingHorizontal: spacing.xxxxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: theme.radii.xxl,
    padding: spacing.xxxxl,
    ...shadows.elevated,
  },
  title: {
    fontSize: fontSizes.hero,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.xxxxl,
  },
  error: {
    color: colors.error,
    fontSize: fontSizes.base,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.xl,
  },
  hint: {
    marginTop: spacing.xxxl,
    paddingTop: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
  },
  hintTitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: letterSpacings.wide,
  },
  hintCred: {
    fontSize: fontSizes.md,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  hintPassword: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    marginTop: spacing.sm,
  },
});
