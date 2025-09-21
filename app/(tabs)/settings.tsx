import Profile from "@/components/dev/settings/profile";import { useAuthStore } from "@/store/auth.store";
import * as ImagePicker from "expo-image-picker";
import { LogOut } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [image, setImage] = useState<string | null>(null);
  const { logout } = useAuthStore();

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
      <View className=" flex-row justify-between items-center mb-5">
        <Text className="text-center text-white font-bold text-3xl">
          Settings
        </Text>

        <TouchableOpacity onPress={() => logout()}>
          <Text>
            <LogOut color={"#fff"} size={24} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <Profile image={image} pickImage={pickImage} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ProfileModal /> */}
        {/* Email */}

        {/* Full name */}

        {/* Theme toggle for bg color and text color */}

        {/* log out button */}
        <View className="mt-10 ">
          <TouchableOpacity
            className=" w-full h-16 bg-blue-300 rounded-lg py-3 text-center text-white font-bold items-center justify-center"
            activeOpacity={0.4}
          >
            <Text className="text-lg font-bold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
