import { useCustomizationStore } from "@/store/customization.store";
import { useProfileStore } from "@/store/profile.store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ThemeControl = () => {
  const colors = [
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
  ];

  const { color, setColor } = useCustomizationStore();
  const { bgColors, textColors } = useProfileStore();

  return (
    <View className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl space-y-4">
      <Text className={`text-lg font-bold ${textColors}`}>Theme Control</Text>

      <View className="flex-row gap-4 mt-3 items-center justify-between">
        {colors.map((col, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            className={`size-10 rounded-full ${col} ${
              col === color ? "border-2 border-white" : ""
            }`}
            onPress={() => setColor(col)}
            disabled={col === color}
          />
        ))}
      </View>
    </View>
  );
};

export default ThemeControl;
