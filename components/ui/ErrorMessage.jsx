import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <View className="flex flex-row items-start justify-between border-red-500 bg-red-100 p-3 rounded-lg overflow-clip">
      <Text className="text-red-500 text-[12px] p-2">{message}</Text>
      <TouchableOpacity
        onPress={() => onClose()}
        className=" flex-2 justify-center items-center  bg-red-300 rounded-md px-2 absolute right-2 top-4"
      >
        <Text className="text-red-900 text-[12px] ">X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorMessage;
