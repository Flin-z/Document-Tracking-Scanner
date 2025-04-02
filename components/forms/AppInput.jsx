import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TextInputField = ({
  control,
  name,
  label,
  rules,
  type = "text",
  placeholder,
  leftIcon,
  defaultValue = "",
  isPassword = false,
  isMultiline = false,
  numberOfLines = 1,
  isRequired = false,
  className,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(isPassword);
  return (
    <View className={"my-1"}>
      {label && (
        <Text
          className="mb-1 text-gray-700 text-sm"
          style={{ fontFamily: "Roboto-Bold" }}
        >
          {label}
        </Text>
      )}
      <Controller
        control={control}
        rules={
          isRequired ? { required: "This field is required", ...rules } : rules
        }
        render={({
          field: { onChange, onBlur, value },
          // formState: { errors },
          fieldState: { error },
        }) => (
          <>
            <View className="flex-row items-center border border-gray-500 rounded-lg px-3 py-2 w-full text-base">
              {leftIcon && <View className="mr-2">{leftIcon}</View>}
              <TextInput
                className={"flex-1"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || defaultValue}
                placeholder={placeholder}
                keyboardType={
                  type === "email"
                    ? "email-address"
                    : type === "number"
                    ? "numeric"
                    : "default"
                }
                secureTextEntry={passwordVisible}
                multiline={isMultiline}
                numberOfLines={numberOfLines}
                style={{
                  fontFamily: "Roboto",
                }}
              />
              {isPassword && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={14}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Text className="text-red-500 text-sm mt-1">
                {error?.message}
              </Text>
            )}
          </>
        )}
        name={name}
      />
    </View>
  );
};

export default TextInputField;
