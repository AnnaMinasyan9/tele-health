import { appStore } from "@shared/store";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {  
  return (
    <Provider store={appStore}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </Provider>
  );
}
