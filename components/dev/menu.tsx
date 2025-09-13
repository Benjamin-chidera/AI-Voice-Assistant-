// In your ExampleMenu component, try this simplified version
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ExampleMenu() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => {
          // console.log("Menu toggle pressed, current visible:", visible);
          setVisible(!visible);
        }}
        style={{
          backgroundColor: "#3b82f6",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>

      {visible && (
        <View
          style={{
            position: "absolute",
            bottom: 70,
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
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)");
              setVisible(false);
            }}
            style={{ padding: 12 }}
          >
            <Text>Conversation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/reminders");
              setVisible(false);
            }}
            style={{ padding: 12 }}
          >
            <Text>Reminders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/(tabs)/settings");
              setVisible(false);
            }}
            style={{ padding: 12 }}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
