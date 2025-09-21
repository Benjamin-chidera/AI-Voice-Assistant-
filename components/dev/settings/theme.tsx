import { useProfileStore } from "@/store/profile.store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Theme = () => {
  const textColor = [
    "text-purple-500",
    "text-pink-500",
    "text-blue-500",
    "text-green-500",
    "text-white",
    "text-red-500",
  ];

  const bgColor = [
    "#8b5cf6", // purple-500
    "#ec4899", // pink-500
    "#3b82f6", // blue-500
    "#10b981", // green-500
    "#0D0D1A", // custom dark
    "#ef4444",
  ];

  // Convert text color classes to background classes for display
  const textColorAsBg = [
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-white",
    "bg-red-500",
  ];

  const { bgColors, setBgColors, textColors, setTextColors } =
    useProfileStore();

  console.log(bgColors);

  return (
    <View className=" flex-col gap-6 my-5">
      <View>
        <Text className={`text-lg font-bold ${textColors}`}>
          Background Colors
        </Text>

        <View className="flex-row gap-4 mt-3 items-center justify-between">
          {bgColor.map((col, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              style={{ backgroundColor: col }}
              className={`size-12 rounded-full ${
                col === bgColors ? "border-2 border-white" : ""
              }`}
              onPress={() => {
                setBgColors(col);
                console.log(col);
              }}
            />
          ))}
        </View>
      </View>

      <View>
        <Text className={`text-lg font-bold ${textColors}`}>Text Color</Text>
        <View className="flex-row gap-4 mt-3 items-center justify-between">
          {textColor.map((col, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              className={`size-12 rounded-full ${textColorAsBg[index]} ${
                col === textColors ? "border-2 border-white" : ""
              }`}
              onPress={() => setTextColors(col)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Theme;
