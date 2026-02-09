import { Ionicons } from "@expo/vector-icons";
import {
  fontSizes,
  fontWeights,
  spacing,
  theme,
  useStyles,
  useTheme,
} from "@shared/theme";
import type { AppTheme } from "@shared/theme";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DoctorTabsLayout() {
  const { colors } = useTheme();
  const styles = useStyles(createStyles);
  

  const TabIcon = ({
    focused,
    icon,
    label,
  }: {
    focused: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }) => {
    return (
      <View style={styles.tabItem}>
        <Ionicons
          name={icon}
          size={28}
          color={focused ? colors.tabActive : colors.tabInactive}
        />
        <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="patients"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="people-outline"
              label="Patients"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sessions"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="calendar-outline"
              label="Sessions"
            />
          ),
        }}
      />
    </Tabs>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    tabBar: {
      height: 90,
      paddingBottom: spacing.md,
      paddingTop: spacing.md,
      backgroundColor: t.colors.surface,
      borderTopWidth: 1,
      borderTopColor: t.colors.border,
    },

    tabItem: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.mdl,
      paddingHorizontal: spacing.md,
      borderRadius: theme.radii.md,
      width: 90,
      height: 50,
    },

    label: {
      marginTop: spacing.xxs,
      fontSize: fontSizes.md,
      fontWeight: fontWeights.medium,
      color: t.colors.tabInactive,
    },

    labelActive: {
      color: t.colors.tabActive,
      fontWeight: fontWeights.semibold,
    },
  });
}
