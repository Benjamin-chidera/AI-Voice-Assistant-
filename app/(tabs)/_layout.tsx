import { Tabs } from "expo-router";
import { Bell, MessageCircle, Settings } from "lucide-react-native";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0D0D1A",
          borderTopColor: "#0D0D1A",
        },
      }}
    >
      <Tabs.Screen name="/app/home" />
      <Tabs.Screen
        name="index"
        options={{
          title: "Coversations",
          tabBarIcon: ({ color, size }) => {
            return <MessageCircle size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",
          tabBarIcon: ({ color, size }) => {
            return <Bell size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <Settings size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
