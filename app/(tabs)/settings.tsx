import Auth from "@/components/dev/settings/auth";
import Profile from "@/components/dev/settings/profile";
import Theme from "@/components/dev/settings/theme";
import { useAuthStore } from "@/store/auth.store";
import { useProfileStore } from "@/store/profile.store";
import * as ImagePicker from "expo-image-picker";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [image, setImage] = useState<string | null>(null);
  const { logout } = useAuthStore();
  const { bgColors, textColors } = useProfileStore();

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
    <SafeAreaView
      className={`flex-1  px-5 py-5`}
      style={{ backgroundColor: bgColors }}
    >
      <View className=" flex-row justify-between items-center mb-5">
        <Text className={`text-center ${textColors} font-bold text-3xl`}>
          Settings
        </Text>

        <TouchableOpacity
          className="bg-gray-800 rounded-full p-2"
          // disabled={customizing}
          // onPress={async () => {
          //   await customize({ voice, language });
          // }}
        >
          <Check color={"#d8b4fe"} />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <Profile image={image} pickImage={pickImage} />

      <ScrollView showsVerticalScrollIndicator={false}>
   
        {/* Auth */}
        <View className=" mt-2">
          <Text className={`${textColors} font-bold text-lg`}>
            Update Account
          </Text>
          <Auth />
        </View>

        {/* Theme toggle for bg color and text color */}
        <View className=" mt-3">
          <Theme />
        </View>

        {/* log out button */}
        <View className="mt-10 ">
          <Button title="Log Out" onPress={() => logout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
