import { Stack } from "expo-router";

import { PaperProvider } from "react-native-paper";

import "@/global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        {/* <Stack.Screen name="home" /> */}
        <Stack.Screen name="onBoarding/index" />
        <Stack.Screen name="(tabs)" options={{}} />
      </Stack>
    </PaperProvider>
  );
}
