import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="viewDocument/[hashcode]" />
      <Stack.Screen name="viewReceivedDocument/[hashcode]" />
    </Stack>
  );
};

export default _layout;
