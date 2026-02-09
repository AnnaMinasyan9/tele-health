import { useTheme } from "@shared/theme";
import { memo, useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { TextField } from "./TextField";

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  loading?: boolean;
  style?: ViewStyle;
};

export const SearchField = memo(function SearchField({
  value,
  onChangeText,
  placeholder = "Search",
  loading = false,
  style,
}: SearchFieldProps) {
  const { colors } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: loading ? 1 : 0,
      duration: loading ? 180 : 220,
      useNativeDriver: true,
    }).start();
  }, [anim, loading]);

  const loadingStyle = useMemo(
    () => ({
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-2, 0],
          }),
        },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    }),
    [anim]
  );

  return (
    <View style={[styles.row, style]}>
      <View style={styles.field}>
        <TextField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          returnKeyType="search"
        />
      </View>

      <Animated.View
        pointerEvents="none"
        style={[styles.loading, loadingStyle]}
      >
        <ActivityIndicator size="small" color={colors.primary} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  field: { flex: 1 },
  loading: {
    position: 'absolute',
    right: 8, 
    top: 8
  },
});

