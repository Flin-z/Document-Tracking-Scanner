import { View, Text } from "react-native";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import NetworkProvider from "../hooks/networkProvider";
import "../global.css";

const queryClient = new QueryClient();

const _layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaView className="flex-1">
          <MenuProvider>
            <NetworkProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="screens" options={{ headerShown: false }} />
              </Stack>
            </NetworkProvider>
          </MenuProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default _layout;
