import { fontWeights, useTheme } from "@shared/theme";
import { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface AvatarProps {
  name: string;
  uri?: string;
  size?: number;
  bg?: string;
  color?: string;
}

export function Avatar({
  name,
  uri,
  size = 44,
  bg,
  color,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { colors } = useTheme();

  const onError = useCallback(() => setImgError(true), []);

  const showImage = !!uri && !imgError;
  const resolvedBg = bg ?? colors.primaryLight;
  const resolvedColor = color ?? colors.primary;

  const initials = useMemo(() => {
    if (!name) return "?";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  const fontSize = Math.round(size * 0.36);
  const borderRadius = size / 2;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: showImage ? "transparent" : resolvedBg,
        },
      ]}
      accessibilityRole="image"
      accessibilityLabel={`Avatar for ${name}`}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius }}
          onError={onError}
        />
      ) : (
        <Text
          style={[styles.text, { fontSize, color: resolvedColor }]}
          allowFontScaling={false}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontWeight: fontWeights.bold,
  },
});
