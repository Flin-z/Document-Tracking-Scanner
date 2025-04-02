import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/index" />
      <Stack.Screen name="documents" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="user-account" />
    </Stack>
  );
};

export default _layout;
