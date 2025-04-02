import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AppInput from "../../../components/forms/AppInput";
import AppButton from "../../../components/forms/AppButton";
import { ScrollView } from "react-native-gesture-handler";

// store
import { setAuthenticated } from "../../../store/store";

// Hooks
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import useErrorHandler from "../../../hooks/useErrorHandler";
import useAxios from "../../../hooks/useAxios";

const index = () => {
  const axios = useAxios();
  const [, setAuthenticatedUser] = useAtom(setAuthenticated);
  const { errorMessage, setErrorMessage, errorHandler } = useErrorHandler();
  const router = useRouter();
  const { control, handleSubmit, setError, reset } = useForm();

  const loginRequest = axios.post({
    key: ["login"],
    url: "/login",
    onSuccess: (data) => {
      setAuthenticatedUser(data);
      reset();
      router.push("/");
    },
    onError: (error) => {
      errorHandler(error, setError);
    },
  });

  const loginHandler = (data) => {
    setErrorMessage("");
    loginRequest.mutateAsync(data);
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 py-4 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="flex-1">
        <ScrollView className="flex-1 px-4 flex bg-white">
          <View className="bg-white flex-1 w-full gap-y-5">
            <View className="flex flex-col mt-4 justify-center  items-center w-full">
              <Text
                className="text-[13px] text-center"
                style={{ fontFamily: "Poppins" }}
              >
                Bicol Regional Hospital and Medical Center
              </Text>
              <Text
                className="text-[19.3px] -mt-2 text-center"
                style={{ fontFamily: "Poppins-Bold" }}
              >
                Document Tracking System
              </Text>
              <Image
                source={require("../../../assets/images/login-cover.png")}
                style={{
                  width: 250,
                  height: 250,
                }}
                resizeMode="contain"
              />
            </View>
            <View
              className="py-8 px-6 bg-white flex flex-col w-full rounded-xl justify-start items-center gap-y-3"
              style={{ elevation: 8, shadowColor: "#888" }}
            >
              <View className="flex flex-col justify-start items-start w-full">
                <Text
                  className="text-lg uppercase text-gray-700"
                  style={{ fontFamily: "Poppins-Bold" }}
                >
                  Login to your account
                </Text>
                <Text
                  className="w-full text-start text-[10px] text-gray-500"
                  style={{ fontFamily: "Poppins" }}
                >
                  Log in to the Document Tracking System to manage and track
                  your documents. Your efficiency starts here!
                </Text>
              </View>
              {errorMessage && (
                <View className="w-full flex flex-row justify-between items-start bg-red-100 p-3 rounded-md">
                  <View>
                    <Text className="text-red-500 text-[11px]">
                      {errorMessage}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => setErrorMessage("")}>
                      <Text
                        className="text-red-100 text-[9px] text-center px-1  bg-red-400 rounded-md"
                        style={{ fontFamily: "Roboto-Bold" }}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View className="w-full">
                <AppInput
                  label="Email Address"
                  control={control}
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  isRequired
                  rules={{
                    required: {
                      value: true,
                      message: "Email address is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                />
              </View>
              <View className="w-full">
                <AppInput
                  label="Password"
                  control={control}
                  name="password"
                  placeholder="Password"
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  }}
                  isRequired
                  isPassword
                />
              </View>

              <View className="w-full">
                <AppButton
                  onPress={handleSubmit(loginHandler)}
                  isLoading={loginRequest.isPending}
                >
                  Login
                </AppButton>
              </View>
            </View>
          </View>
          <View className="w-full mt-12">
            <Text className="text-center text-gray-500 text-xs">
              © 2024 BRHMC IHOMP-IT. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default index;
