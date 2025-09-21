import { useProfileStore } from "@/store/profile.store";
import { ArrowRight, Mic } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const VoiceSelection = () => {
  const [visible, setVisible] = useState(false);
  const { voice, setVoice } = useProfileStore();

  return (
    <View>
      <View className="mt-10">
        <Text className="text-white font-bold text-lg">Voice</Text>

        <TouchableOpacity
          className="bg-gray-800 w-full rounded-xl mt-2 py-5 px-4 justify-between flex flex-row items-center"
          activeOpacity={0.8}
          onPress={() => {
            // console.log("Menu toggle pressed, current visible:", visible);
            setVisible(!visible);
          }}
        >
          <View className=" flex flex-row  gap-5 items-center">
            <View className="border-2 border-gray-500 p-4 rounded-xl shadow shadow-3xl shadow-slate-200">
              <Mic color={"blue"} />
            </View>

            <View>
              <Text className="text-white font-bold text-lg">
                Voice Selection
              </Text>
              <Text className="text-gray-200 text-lg">{voice}</Text>
            </View>
          </View>

          <View>
            <ArrowRight color={"white"} />
          </View>
        </TouchableOpacity>
      </View>

      {/* this is the selection menu */}
      {visible && (
        <View
          style={{
            position: "absolute",
            bottom: -125,
            right: 0,
            backgroundColor: "white",
            borderRadius: 8,
            padding: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            minWidth: 150,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setVoice("Alloy");
            }}
            style={{ padding: 12 }}
          >
            <Text>Alloy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setVoice("Verse");
            }}
            style={{ padding: 12 }}
          >
            <Text>Verse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setVoice("Aria");

            }}
            style={{ padding: 12 }}
          >
            <Text>Aria</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VoiceSelection;
