import { Button, ButtonText } from "@/components/ui/button";
import { useChatStore } from "@/store/chat";
import { useProfileStore } from "@/store/profile.store";
import { router } from "expo-router";
import { ArrowLeft, Send } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Conversation = () => {
  const { chat, setChat, sendChat, isProcessing, messages } = useChatStore();
  const { bgColors, textColors } = useProfileStore();

  const handSendChat = async () => {
    await sendChat({ chat });
  };
  return (
    <SafeAreaView
      className={` flex-1  px-5 py-5`}
      style={{ backgroundColor: bgColors }}
    >
      <View className=" flex-row items-center justify-between mb-5">
        <Pressable onPress={() => router.push("/home")}>
          <Text>
            <ArrowLeft color={"white"} size={24} />
          </Text>
        </Pressable>

        <Text className={`${textColors} font-bold text-2xl`}>Conversation</Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`rounded-lg p-4 max-w-[80%] ${
                  message.type === "user"
                    ? "bg-gray-800 self-end my-3"
                    : "bg-blue-600 self-start mb-5"
                }`}
              >
                <Text className="text-white text-base">{message.text}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {message.type === "user" ? "You" : "Assistant"}
                </Text>
              </View>
            ))}

            {isProcessing && (
              <View className="bg-gray-700 rounded-lg p-4 self-start max-w-[80%] my-3">
                <Text className="text-gray-300 text-base">Processing...</Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View className=" flex-row justify-between items-center w-full gap-3 mb-2">
          <View className="flex-1">
            <TextInput
              className="border border-white rounded-lg px-4 py-4 text-white"
              placeholder="Type a message"
              value={chat}
              onChangeText={setChat}
            />
          </View>

          <Button
            action={"primary"}
            variant={"solid"}
            size={"lg"}
            className="bg-blue-500 rounded-lg px-4 py-2 text-white"
            disabled={isProcessing || !chat}
            onPress={handSendChat}
          >
            <ButtonText>
              <Send color={"#fff"} size={24} />
            </ButtonText>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Conversation;
