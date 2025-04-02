import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import AppButton from "../forms/AppButton";

const NoCameraPermission = ({ onGrantPermission }) => {
  return (
    <View className="p-8 bg-white flex-1 flex items-center justify-center gap-4">
      <Text
        className="text-2xl px-8 text-red-800 text-center"
        style={{ fontFamily: "Poppins-Bold" }}
      >
        Camera Permissions Required
      </Text>
      <LottieView
        autoPlay
        source={require("../../assets/lottie/camera.json")}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <View className="w-full">
        <AppButton onPress={onGrantPermission}>Grant Permission</AppButton>
      </View>
    </View>
  );
};

export default NoCameraPermission;
