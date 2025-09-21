import React from "react";
import { Text, View } from "react-native";

const ThemeControl = () => {
  return (
    <View className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl space-y-4">
      <Text className="text-lg font-bold text-white">Theme Control</Text>
    </View>
  );
};

export default ThemeControl;
