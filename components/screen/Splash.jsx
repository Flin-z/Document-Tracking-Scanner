import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = ({ message }) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100 justify-center items-center p-7  gap-y-18">
      <StatusBar backgroundColor="#f3f3f3" barStyle="dark-content" />
      <View className="flex-1 flex-col justify-center items-center ">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 160,
            height: 160,
          }}
        />
        <Text className="text-[13px]" style={{ fontFamily: "Poppins" }}>
          Bicol Regional Hospital and Medical Center
        </Text>
        <Text className="text-[20px] -mt-2" style={{ fontFamily: "Poppins" }}>
          Document Tracking System
        </Text>
      </View>
      <View>
        <Text
          className="text-[10px] text-center text-gray-500"
          style={{ fontFamily: "Poppins" }}
        >
          Welcome to the Document Tracking System App! Your reliable partner in
          managing and tracking documents efficiently.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
