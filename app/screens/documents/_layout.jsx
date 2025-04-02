import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="internal-document" />
      <Stack.Screen name="incoming-document" />
      <Stack.Screen name="outgoing-document" />
      <Stack.Screen name="file-viewer/index" />
    </Stack>
  );
};

export default _layout;
