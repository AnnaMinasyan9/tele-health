import { colors, fontSizes, fontWeights, spacing, theme } from "@shared/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  placeholderColor?: string;
  error?: boolean;
  errorMessage?: string;
  style?: StyleProp<TextStyle>;
}

export function TextField({
  placeholderColor = colors.textTertiary,
  error = false,
  errorMessage,
  style,
  autoCapitalize = "none",
  autoCorrect = false,
  ...rest
}: TextFieldProps) {
  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={placeholderColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        {...rest}
      />
        <View style={styles.fieldErrorContainer}>

      {errorMessage !== undefined && (
          <Text style={styles.fieldError}>{errorMessage}</Text>
      )}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldErrorContainer: {
    height: 25,
    paddingLeft: spacing.xs,
  },
  fieldError: {
    color: colors.error,
    fontSize: fontSizes.sm,
  },
});
