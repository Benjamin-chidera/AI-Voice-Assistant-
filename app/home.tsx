import { Button, ButtonText } from "@/components/ui/button";
import { useCommunicationStore } from "@/store/communication.store";
import { useCustomizationStore } from "@/store/customization.store";
import { useProfileStore } from "@/store/profile.store";
// import { useOnBoardingStore } from "@/store/onBoarding.store";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  // for playing sound
  // useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

import { Link } from "expo-router";
import { Eye, EyeOff, MessageCircle, Mic, MicOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // const { hasOnBoarded } = useOnBoardingStore();
  const {
    voice,
    messages,
    isProcessing,
    // communication_response: { speech_response },
    // ai_response,
    // stream,
    // url,
  } = useCommunicationStore();
  const { color, loadSettings } = useCustomizationStore();
  const { loadColors, textColors, bgColors } = useProfileStore();
  const [show, setShow] = useState(true);
  // const [player, setPlayer] = useState<any>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // console.log("Recorder state:", recorderState);

  useEffect(() => {
    // Load saved settings when app starts
    loadSettings();
    loadColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecording = async () => {
    if (!isReady) {
      Alert.alert("Recorder not ready yet");
      return;
    }

    try {
      if (isRecording) {
        // Stop recording
        await audioRecorder.stop();
        setIsRecording(false);

        // safer than relying on recorderState.url
        const recordingUrl = audioRecorder.uri;
        if (recordingUrl) {
          // console.log("Processing audio:", recordingUrl);
          await voice(recordingUrl);
        }
      } else {
        // Reset any existing session
        if (recorderState.isRecording) {
          await audioRecorder.stop();
        }

        await audioRecorder.prepareToRecordAsync();
        await audioRecorder.record();
        setIsRecording(true);
      }
    } catch (error) {
      console.error("Recording error:", error);
      setIsRecording(false);
      Alert.alert("Error", "Failed to handle recording");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        console.log("Permission status:", status);

        if (!status.granted) {
          Alert.alert("Permission to access microphone was denied");
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
          // interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          // interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          // shouldDuckAndroid: true,
          // playThroughEarpieceAndroid: false,
        });

        setIsReady(true); // ✅ mark ready here
      } catch (err) {
        console.error("Audio setup error:", err);
      }
    })();
  }, []);

  // this is for playing the sound audio

  // const audioPlayer = useAudioPlayer(url); // Hook must be called at the top level

  // useEffect(() => {
  //   (async () => {
  //     await stream(ai_response);
  //     if (url) {
  //       setPlayer(audioPlayer); // store it in state
  //     }
  //   })();
  // }, [url, audioPlayer]);

  // const handlePlay = async () => {
  //   console.log("Playing audio from URL:", url);

  //   // if (player) {
  //   //   await player.play(); // only plays when user presses button
  //   // }
  //   await stream(ai_response);
  // };

  return (
    <SafeAreaView
      className={`flex-1 px-5 py-5`}
      style={{ backgroundColor: bgColors }}
    >
      {/* Header - Fixed */}
      <View className="flex-row justify-between mb-5">
        <Text className={`${textColors} font-bold text-2xl tracking-wider`}>
          Voice Assistant
        </Text>
 
        <View>
          <Button action={"primary"} variant={"link"} size={"sm"}>
            <Link href={"/(tabs)"}>
              <ButtonText>
                <MessageCircle color={"#d8b4fe"} />
              </ButtonText>
            </Link>
          </Button>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 relative">
        {/* Scrollable Text Background */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingTop: 100, paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="space-y-4">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`rounded-lg p-4 max-w-[80%] ${
                  message.type === "user"
                    ? "bg-gray-800 self-end my-3"
                    : "bg-blue-600 self-start"
                }`}
              >
                <Text className="text-white text-base">{message.text}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {message.type === "user" ? "You" : "Assistant"}
                </Text>
              </View>
            ))}

            {isProcessing && (
              <View className="bg-gray-700 rounded-lg p-4 self-start max-w-[80%] mt-2">
                <Text className="text-gray-300 text-base">Processing...</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Mic Button - Fixed in Center */}
        {show && (
          <View
            className="absolute inset-0 justify-center items-center"
            pointerEvents="box-none"
          >
            <Button
              onPress={handleRecording}
              disabled={isProcessing}
              action={"primary"}
              variant={"solid"}
              size={"lg"}
              className={`w-32 h-32 rounded-full ${
                isRecording ? "bg-red-500" : color
              } shadow-lg`}
            >
              <ButtonText>
                {isRecording ? (
                  <MicOff color={"white"} size={48} />
                ) : (
                  <Mic color={"white"} size={48} />
                )}
              </ButtonText>
            </Button>
          </View>
        )}

        {/* this is to play the sound */}
        {/* <View>
          <Button onPress={handlePlay}>
            <ButtonText className=" text-white">Play Sound</ButtonText>
          </Button>
        </View> */}
        {/* this is to play the sound */}

        {/* Eye Toggle Button - Fixed Position with Higher Z-Index */}
        <TouchableOpacity
          activeOpacity={1}
          className="absolute bottom-5 right-5 bg-gray-800/80 rounded-full p-3 z-50"
          onPress={() => setShow(!show)}
          style={{ elevation: 10 }} // Android shadow/elevation
        >
          {!show ? (
            <Eye color={"#d8b4fe"} size={24} />
          ) : (
            <EyeOff color={"#d8b4fe"} size={24} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
