import { appStore } from "@shared/store";
import { ThemeProvider } from "@shared/theme";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {  
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
