import { View, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, useRouter, useRootNavigationState } from "expo-router";
import useSecureStore from "../hooks/useSecureStore";
import useAxios from "../hooks/useAxios";
import { setToken, accessToken, user } from "../store/store";
import { useAtom } from "jotai";
import Splash from "../components/screen/Splash";
import "../global.css";

const Index = () => {
  const { getKey } = useSecureStore();
  const axios = useAxios();
  const router = useRouter();
  const [localToken] = useAtom(accessToken);
  const [, setUser] = useAtom(user);
  const [, setAccessToken] = useAtom(setToken);
  const [isAppReady, setIsAppReady] = useState(false);
  const navigationState = useRootNavigationState();

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const getRequest = axios.get({
    key: ["user", localToken],
    url: "user",
    options: { enabled: !!localToken }, // Prevent fetching without token
  });

  // Ensure the app is ready before hiding the splash screen
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => setIsAppReady(true));
    }
  }, [fontsLoaded]);

  // Retrieve token from SecureStore
  useEffect(() => {
    getKey("dtrack-token").then((res) => {
      if (res) {
        setAccessToken(res);
      } else {
        router.replace("/screens/auth");
      }
    });
  }, []);

  // Navigate when everything is ready
  useEffect(() => {
    if (navigationState?.key) {
      if (getRequest.isError && !localToken) {
        router.replace("/screens/auth");
      }

      if (getRequest.isSuccess && localToken) {
        setUser(getRequest?.data);
        router.replace("/screens");
      }
    }
  }, [isAppReady, localToken, getRequest.isError, getRequest.isSuccess]);

  return <Splash />;
};

export default Index;
