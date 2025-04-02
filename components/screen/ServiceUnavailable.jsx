import { View, Text, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const ServiceUnavailable = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text
        className="text-[84px] text-red-800"
        style={{ fontFamily: "Roboto-Bold" }}
      >
        503
      </Text>
      <Text className="text-[20px]" style={{ fontFamily: "Roboto-Bold" }}>
        Service Unavailable
      </Text>
      <LottieView
        autoPlay
        style={{
          width: 500,
          height: 200,
        }}
        source={require("../../assets/lottie/connection.json")}
      />
      <Text
        className="text-[12px] px-12 text-center"
        style={{ fontFamily: "Roboto" }}
      >
        Please make sure that you are connected to BRHMC Wifi Network.
      </Text>
    </View>
  );
};
export default ServiceUnavailable;
