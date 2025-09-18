import { Button, ButtonText } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { Redirect, router } from "expo-router";
import { Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const {
    register,
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isAuthenticated,
  } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    console.log("Sign Up");
    await register({ fullname, email, password });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) {
    return <Redirect href={"/home"} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0D0D1A]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1 px-7 py-5"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center mb-8">
            <Text className="text-white text-3xl font-bold mb-1">
              Create Account
            </Text>
            <View className="items-center">
              <Text className="text-lg text-gray-400">
                Join the future of voice assistance.
              </Text>
            </View>
          </View>

          <View className=" flex-1 flex-col gap-5 mb-8">
            <TextInput
              label="Full Name"
              mode="outlined"
              className="border border-transparent bg-[#1E1E2C] text-white"
              value={fullname}
              onChangeText={setFullname}
              // onChangeText={(text) => setFullname(text)}
            />
            <TextInput
              label="Email"
              mode="outlined"
              className="border border-transparent bg-[#1E1E2C] text-white"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              // onChangeText={(text) => setEmail(text)}
            />
            <View className=" relative">
              <TextInput
                label="Password"
                mode="outlined"
                className="border border-transparent bg-[#1E1E2C] text-white pr-10"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                // onChangeText={(text) => setPassword(text)}
              />

              <Pressable
                onPress={handleShowPassword}
                className=" absolute right-2 bottom-4"
              >
                <Text className="text-blue-500 underline text-sm">
                  {showPassword ? (
                    <EyeClosed color={"#57575D"} size={20} />
                  ) : (
                    <Eye color={"#57575D"} size={20} />
                  )}
                </Text>
              </Pressable>
            </View>

            <View className="mb-10">
              <Button
                variant="solid"
                size="lg"
                isDisabled={loading || !fullname || !email || !password}
                className="bg-blue-500 rounded-full h-14 w-full"
                onPress={handleSignUp}
              >
                <ButtonText className="flex justify-center items-center">
                  <Text className="mr-2">
                    {" "}
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Text>
                </ButtonText>
              </Button>
            </View>
          </View>

          <View className="mb-10 flex-row items-center justify-center gap-2">
            <Text className=" text-center text-white text-sm">
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => router.replace("/(auth)/sign-in")}
              className="text-blue-500 underline"
            >
              <Text className="text-blue-500 underline text-sm">Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
