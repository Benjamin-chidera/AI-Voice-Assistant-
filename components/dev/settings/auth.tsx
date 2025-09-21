import { useProfileStore } from "@/store/profile.store";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const Auth = () => {
  const { bgColors, textColors } = useProfileStore();
  return (
    <View className=" flex-col gap-2">
      <TextInput
        className="border border-white rounded-lg px-4 py-4 text-white placeholder:text-gray-400"
        placeholder="Full Name"
        // value={fullname}
        // onChangeText={setFullname}
        // onChangeText={(text) => setFullname(text)}
      />

      <TextInput
        className="border border-white rounded-lg px-4 py-4 text-white placeholder:text-gray-400"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        // value={email}
        // onChangeText={setEmail}
      />

      <View className=" relative">
        <TextInput
          className="border border-white rounded-lg px-4 py-4 text-white placeholder:text-gray-400"
          placeholder="Password"
          //   secureTextEntry={!showPassword}
          //   value={password}
          //   onChangeText={setPassword}
        />

        <Pressable
          //   onPress={handleShowPassword}
          className=" absolute right-2 bottom-4"
        >
          <Text className="text-blue-500 underline text-sm">
            {/* {showPassword ? (
              <EyeClosed color={"#57575D"} size={20} />
            ) : (
              <Eye color={"#57575D"} size={20} />
            )} */}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Auth;
