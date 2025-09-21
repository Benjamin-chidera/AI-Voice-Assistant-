import { Tabs } from "expo-router";
import { Component, MessageCircle, Settings } from "lucide-react-native";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0D0D1A",
          borderTopColor: "#0D0D1A",
          // paddingBottom:0,
          // marginBottom:0,
          
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
        name="Customize"
        options={{
          title: "Customize",
          tabBarIcon: ({ color, size }) => {
            return <Component size={size} color={color} />;
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
