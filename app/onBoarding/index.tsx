import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
// import { ChevronRight } from "lucide-react-native";

import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const OnBoardingScreen = () => {
  return (
    <SafeAreaView className=" flex-1 bg-[#0D0D1A] px-7">
      <View className=" flex-1">
        <View className=" flex-1 justify-center items-center">
          {/* add an ai image here */}
          <Image
            source={require("@/assets/images/onBoarding.png")}
            className="w-48 h-48 rounded-full object-cover mx-auto shadow-2xl shadow-white"
          />

          <View className="items-center">
            <Text className=" text-white tracking-tight text-4xl font-bold leading-tight mb-5">
              Welcome to <Text className=" text-blue-500">Echo</Text>
            </Text>

            <Text className=" text-slate-400 text-lg font-normal leading-relaxed mt-4 max-w-sm mx-auto text-center">
              Your personal AI assistant, ready to help with anything you needs
            </Text>
          </View>
        </View>

        <View className=" mb-10">
          <Link href={"/(tabs)"}>
            <Button
              // action={"primary"}
              variant={"solid"}
              size={"lg"}
              isDisabled={false}
              className=" bg-blue-500 rounded-full h-14"
            >
              <ButtonText className="flex justify-center items-center">
                <Text className="mr-2">Get Started</Text>{" "}
                {/* <ChevronRight /> */}
              </ButtonText>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OnBoardingScreen;
