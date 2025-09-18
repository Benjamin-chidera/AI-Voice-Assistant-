import { Button, ButtonText } from "@/components/ui/button";
import { useOnBoardingStore } from "@/store/onBoarding.store";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoardingScreen = () => {
  const { setHasOnBoarded } = useOnBoardingStore();

  const handleOnBoarding = async () => {
    setHasOnBoarded(true);
    await SecureStore.setItemAsync("onBoarded", "true");
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D0D1A] px-7">
      <View className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/onBoarding.png")}
            className="w-48 h-48 rounded-full object-cover mx-auto shadow-2xl shadow-white"
          />
          <View className="items-center">
            <Text className="text-white tracking-tight text-4xl font-bold leading-tight mb-5">
              Welcome to <Text className="text-blue-500">Echo</Text>
            </Text>
            <Text className="text-slate-400 text-lg font-normal leading-relaxed mt-4 max-w-sm mx-auto text-center">
              Your personal AI assistant, ready to help with anything you need
            </Text>
          </View>
        </View>

        <View className="mb-10">
          <Button
            onPress={handleOnBoarding}
            variant="solid"
            size="lg"
            isDisabled={false}
            className="bg-blue-500 rounded-full h-14 w-full"
          >
            <ButtonText className="flex justify-center items-center">
              <Text className="mr-2 text-white">Get Started</Text>
            </ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
