import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const AppButton = ({
  isDisabled = false,
  onPress,
  children,
  leftIcon,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row justify-center my-1 py-2 items-center rounded-lg bg-primary
      }
      `}
      style={{ elevation: 2 }}
      disabled={isDisabled || isLoading}
    >
      <View className="flex flex-1 flex-row items-center justify-center gap-x-1">
        {leftIcon && <View>{leftIcon}</View>}
        <Text
          className="text-white text-md uppercase text-[14px] items-center justify-center"
          style={{ fontFamily: "Roboto-Bold" }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            children
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
