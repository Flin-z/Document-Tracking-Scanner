import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";

// Hooks
import { useRouter } from "expo-router";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StackHeader = ({ headerTitle, leftAction, rightAction }) => {
  const router = useRouter();

  return (
    <View className="flex-row w-full items-center justify-between bg-primary p-2 z-50">
      <StatusBar backgroundColor="#529d7c" barStyle="light-content" />
      <View className="">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-3 items-center">
        <Text
          className="text-xl font-bold ont-poppins text-start text-white"
          style={{ fontFamily: "Roboto-Bold" }}
        >
          {headerTitle}
        </Text>
      </View>

      <View className="min-w-[40px] flex-2 items-end">
        {rightAction && rightAction}
      </View>
    </View>
  );
};

export default StackHeader;
