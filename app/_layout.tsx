import "@/global.css";
import { useAuthStore } from "@/store/auth.store";
import { useOnBoardingStore } from "@/store/onBoarding.store";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

// Prevent splash from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { hasOnBoarded, setHasOnBoarded } = useOnBoardingStore();
  const { setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        const result = await SecureStore.getItemAsync("onBoarded");
        const token = await SecureStore.getItemAsync("token");

        setHasOnBoarded(result === "true");

        if (token) {
          setIsAuthenticated(true);
        }
        
      } catch {
        setHasOnBoarded(false);
      } finally {
        SplashScreen.hideAsync(); // hide once store is ready
      }
    };

    prepare();
  }, [setHasOnBoarded, setIsAuthenticated]);

  if (hasOnBoarded === null) {
    // still loading → keep splash visible
    return null;
  }

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onBoarding/index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </PaperProvider>
  );
}
