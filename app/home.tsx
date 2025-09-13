import ExampleMenu from "@/components/dev/menu";
import { Button, ButtonText } from "@/components/ui/button";
import { useOnBoardingStore } from "@/store/onBoarding.store";
import { Link } from "expo-router";
import { Mic, Settings } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { hasOnBoarded } = useOnBoardingStore();

  // console.log("hasOnBoarded", hasOnBoarded);

  return (
    <SafeAreaView className=" flex-1 bg-[#0D0D1A] px-7 py-5">
      <View className="flex-row justify-between">
        <Text className="text-white font-bold text-2xl tracking-wider">
          Voice Assistant
        </Text>

        <View>
          <Button action={"primary"} variant={"link"} size={"sm"}>
            <Link href={"/(tabs)/settings"}>
              <ButtonText>
                <Settings color={"#d8b4fe"} />
              </ButtonText>
            </Link>
          </Button>
        </View>
      </View>

      <View className=" flex-1 justify-center items-center">
        <Button
          action={"primary"}
          variant={"solid"}
          size={"lg"}
          isDisabled={false}
          className="bg-blue-600 rounded-full h-48 w-48 flex-shrink-0 justify-center items-center"
        >
          <View>
            <ButtonText>
              <Mic size={"50px"} color={"#fff"} />
            </ButtonText>
          </View>
        </Button>
      </View>

      {/* this is the menu */}

      <View 
        style={{ 
          position: 'absolute', 
          bottom: 50, 
          right: 20, 
          zIndex: 999 
        }}
      >
        <ExampleMenu />
      </View>
    </SafeAreaView>
  );
}
