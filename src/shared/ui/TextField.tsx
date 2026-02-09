import {
  fontSizes,
  fontWeights,
  spacing,
  theme,
  useStyles,
  useTheme,
  type AppTheme,
} from "@shared/theme";
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
  placeholderColor,
  error = false,
  errorMessage,
  style,
  autoCapitalize = "none",
  autoCorrect = false,
  ...rest
}: TextFieldProps) {
  const { colors } = useTheme();
  const styles = useStyles(createStyles);

  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={placeholderColor ?? colors.textTertiary}
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

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: t.colors.border,
      borderRadius: theme.radii.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      color: t.colors.textPrimary,
      backgroundColor: t.colors.surface,
    },
    inputError: {
      borderColor: t.colors.error,
    },
    fieldErrorContainer: {
      height: 25,
      paddingLeft: spacing.xs,
    },
    fieldError: {
      color: t.colors.error,
      fontSize: fontSizes.sm,
    },
  });
}
