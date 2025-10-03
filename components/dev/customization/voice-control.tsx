import { useCustomizationStore } from "@/store/customization.store";
import { useProfileStore } from "@/store/profile.store";
import { Picker } from "@react-native-picker/picker";
import { SquareArrowUpRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const VoiceControl = () => {
  const voice_names = [
    {
      name: "Samantha",
      identifier: "com.apple.ttsbundle.Samantha-compact",
    },
    {
      name: "Daniel",
      identifier: "com.apple.ttsbundle.Daniel-compact",
    },
    {
      name: "Alice",
      identifier: "com.apple.voice.compact.it-IT.Alice",
    },
    {
      name: "Luciana",
      identifier: "com.apple.voice.compact.pt-BR.Luciana",
    },
    {
      name: "Kyoko",
      identifier: "com.apple.ttsbundle.Kyoko-compact",
    },
  ];

  const {
    voice,
    setVoice,
    language,
    setLanguage,
    setVoiceIdentifier,
    voiceIdentifier,
  } = useCustomizationStore();
  const { bgColors, textColors } = useProfileStore();

  // console.log(voiceIdentifier);

  return (
    <View className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl space-y-4 mb-5">
      <Text className={`text-lg font-bold ${textColors}`}>Voice Control</Text>

      <View>
        <Text className={`text-sm ${textColors}`}>AI Voice Selection</Text>

        <View className="mt-2">
          {voice_names.map((v, i) => (
            <TouchableOpacity
              activeOpacity={1}
              key={i + 1}
              className={`flex-row items-center justify-between gap-4 p-3 rounded-lg my-2 ${
                voice === v.name
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              onPress={() => {
                setVoice(v.name);
                console.log("Voice identifier already set", v.identifier);
                  setVoiceIdentifier?.(v?.identifier);
              
              }}
              disabled={voice === v.name}
            >
              <Text className={`text-sm ${textColors}`}>{v.name}</Text>

              <View className="w-fit h-fit rounded-full p-2 bg-blue-500">
                <SquareArrowUpRight
                  size={16}
                  color={voice === v.name ? "#FFD700" : "#fff"}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="">
          <View>
            <Text className={`text-sm ${textColors}`}>
              Echo Langauage Output
            </Text>
            <Picker
              selectedValue={language}
              // style={styles.picker}
              onValueChange={(itemValue) => setLanguage(itemValue)}
              className="text-white"
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="French" value="fr" />
              <Picker.Item label="German" value="de" />
              <Picker.Item label="Chinese (Mandarin)" value="zh" />
              <Picker.Item label="Hindi" value="hi" />
              <Picker.Item label="Bengali" value="bn" />
              <Picker.Item label="Portuguese" value="pt" />
              <Picker.Item label="Russian" value="ru" />
              <Picker.Item label="Japanese" value="ja" />
              <Picker.Item label="Cantonese (Yue)" value="yue" />
              <Picker.Item label="Turkish" value="tr" />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VoiceControl;
