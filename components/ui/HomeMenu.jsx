import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const HomeMenu = ({ image, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className="flex items-center flex-row gap-x-2 p-3 px-5 w-full bg-white border border-primary rounded-lg"
        style={{ elevation: 2 }}
      >
        <View className="w-1/4   items-center justify-center">
          {image && (
            <Image source={image} className="absolute w-[120px] h-[120px]" />
          )}
        </View>
        <View className="flex-1 flex-col pl-6">
          <Text className="text-[18px] font-poppins font-bold text-primary">
            {title}
          </Text>
          <Text
            style={{ fontFamily: "Roboto" }}
            className="flex text-[11px] text-justify text-gray-600 opacity-90"
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeMenu;
