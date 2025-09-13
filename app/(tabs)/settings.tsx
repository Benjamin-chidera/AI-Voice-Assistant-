import GoogleCalendar from "@/components/dev/settings/google-calendar";
import LanguageSelection from "@/components/dev/settings/language";
import Profile from "@/components/dev/settings/profile";
import VoiceSelection from "@/components/dev/settings/voice-selection";
import React, { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";


const Settings = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile picture
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri + `?t=${Date.now()}`;
      setImage(uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D0D1A] px-7 py-5">
      <Text className="text-center text-white font-bold text-3xl">
        Settings
      </Text>

      {/* Profile Picture */}
      <Profile image={image} pickImage={pickImage} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Voice selection */}
        <VoiceSelection />

        {/* Language selection */}
        <LanguageSelection />

        {/* Language selection */}
        <GoogleCalendar />

        {/* log out button */}
        <View className="mt-10">
          <Button title="Log Out" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
