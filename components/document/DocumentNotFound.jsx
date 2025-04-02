import { View, Text, Image } from "react-native";
import React from "react";

const DocumentNotFound = () => {
  return (
    <View className={`flex flex-1 justify-center items-center overflow-hidden`}>
      <Text
        className={`text-[22px] px-12 text-gray-400 text-center mb-12`}
        style={{ fontFamily: "Poppins" }}
      >
        No Document Found
      </Text>
      <Image
        source={require("../../assets/images/no-document.png")}
        style={{ width: 820, height: 240, marginTop: -50 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default DocumentNotFound;
