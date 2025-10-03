import ThemeControl from "@/components/dev/customization/theme-control";
import VoiceControl from "@/components/dev/customization/voice-control";
import { useCustomizationStore } from "@/store/customization.store";
import { useProfileStore } from "@/store/profile.store";
import { Check } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Customize = () => {
  const { voice, language, customize, customizing, voiceIdentifier } = useCustomizationStore();
  const { bgColors, textColors } = useProfileStore();

  console.log(voiceIdentifier);
  

  return (
    <SafeAreaView
      className={`flex-1  px-5 py-5`}
      style={{ backgroundColor: bgColors }}
    >
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`${textColors} font-bold text-2xl text-center`}>
          Customization
        </Text>

        <TouchableOpacity
          className="bg-gray-800 rounded-full p-2"
          disabled={customizing}
          onPress={async () => {
            await customize({ voice, language, voiceIdentifier });
          }}
        >
          <Check color={"#d8b4fe"} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-col gap-5"
        showsVerticalScrollIndicator={false}
      >
        <VoiceControl />

        <ThemeControl />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Customize;
