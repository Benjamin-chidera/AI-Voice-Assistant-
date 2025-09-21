import { usesettingsStore } from "@/store/setting.store";
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
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-[#0D0D1]",
    "bg-red-500",
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

  const { textColors, setTextColors, bgColors, setBgColors } =
    usesettingsStore();

  //   console.log("textColors", textColors);
  console.log("bgColors", bgColors);

  return (
    <View className=" flex-col gap-6 my-5">
      <View>
        <Text className="text-lg font-bold text-white">Background Colors</Text>
        <View className="flex-row gap-4 mt-3 items-center justify-between">
          {bgColor.map((col, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              className={`size-10 rounded-full ${col} ${
                col === bgColors ? "border-2 border-white" : ""
              }`}
              onPress={() => setBgColors(col)}
              disabled={col === bgColors}
            />
          ))}
        </View>
      </View>
       
      <View>
        <Text className="text-lg font-bold text-white">Text Color</Text>
        <View className="flex-row gap-4 mt-3 items-center justify-between">
          {textColor.map((col, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              className={`size-10 rounded-full ${textColorAsBg[index]} ${
                col === textColors ? "border-2 border-white" : ""
              }`}
              onPress={() => setTextColors(col)}
              disabled={col === textColors}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Theme;
