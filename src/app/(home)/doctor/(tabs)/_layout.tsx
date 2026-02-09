import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes, fontWeights, spacing, theme } from "@shared/theme";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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
    <View style={[styles.tabItem]}>
      <Ionicons
        name={icon}
        size={28}
        color={focused ? colors.tabActive : colors.tabInactive}
      />
      <Text
        style={[
          styles.label,
          focused && styles.labelActive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default function DoctorTabsLayout() {
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
const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.mdl,
    paddingHorizontal: spacing.md,
    borderRadius: theme.radii.md,
    width:90,
    height: 50,
  },


  label: {
    marginTop: spacing.xxs,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    color: colors.tabInactive,
  },

  labelActive: {
    color: colors.tabActive,
    fontWeight: fontWeights.semibold,
  },
});
