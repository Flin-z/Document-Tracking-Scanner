import { View, Text } from "react-native";
import React from "react";
import StackHeader from "../../../components/ui/StackHeader";

import AppButton from "../../../components/forms/AppButton";
import AppInput from "../../../components/forms/AppInput";
import { Alert } from "react-native";
import ErrorMessage from "../../../components/ui/ErrorMessage";

import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { useEffect } from "react";

const ChangePassword = () => {
  const { control, handleSubmit, setError, reset } = useForm();
  const axios = useAxios();
  const { errorHandler, errorMessage, setErrorMessage } = useErrorHandler();

  const putRequest = axios.put({
    key: ["change-password"],
    url: "user-detail/change-password",
    onError: (error) => {
      errorHandler(error, setError);
    },
    onSuccess: () => {
      Alert.alert("Success", "Your password has been successfully changed");
      setErrorMessage(null);
      reset();
    },
  });

  const onChangePasswordHandler = (data) => {
    if (data) {
      putRequest.mutateAsync(data);
    }
  };

  return (
    <View className="flex-1 w-full items-center">
      <StackHeader />
      <View className="flex-1 w-full p-4">
        <View
          className="bg-white rounded-lg p-4 gap-y-2"
          style={{ elevation: 4 }}
        >
          <Text
            className=" font-bold text-slate-500 text-[24px] mb-2"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Change Password
          </Text>

          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          )}

          <AppInput
            label="Current Password"
            isPassword
            control={control}
            name="current_password"
            isRequired
            placeholder="Current Password"
          />
          <AppInput
            label="New Password"
            isPassword
            control={control}
            isRequired
            name="new_password"
            placeholder="New Password"
          />
          <AppInput
            label="Confirm Password"
            isPassword
            isRequired
            control={control}
            name="new_password_confirmation"
            placeholder="Confirm Password"
          />
          <AppButton
            isLoading={putRequest.isPending}
            onPress={handleSubmit(onChangePasswordHandler)}
          >
            Change Password
          </AppButton>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
