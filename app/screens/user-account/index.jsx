import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React from "react";
import { LogoutUser, user } from "../../../store/store";

// icons
import { Ionicons, Entypo } from "@expo/vector-icons";

// Hooks
import { useAtom } from "jotai";
import { useRouter } from "expo-router";

// components
import StackHeader from "../../../components/ui/StackHeader";

const index = () => {
  const router = useRouter();
  const [, setLogoutUser] = useAtom(LogoutUser);
  const [userDetails] = useAtom(user);

  const userSettings = [
    // {
    //   title: "My Documents",
    //   icon: <Ionicons name="document-outline" size={24} color="black" />,
    //   action: () => router.replace("screens/user-account/my-documents"),
    // },
    {
      title: "Change Password",
      icon: <Ionicons name="lock-closed-outline" size={24} color="black" />,
      action: () => router.replace("screens/user-account/ChangePassword"),
    },
    {
      title: "Logout",
      icon: <Ionicons name="exit-outline" size={24} color="black" />,
      action: () => {
        setLogoutUser();
        router.replace("/");
      },
    },
  ];
  return (
    <View className="flex-1 w-full items-center">
      <StackHeader
        headerTitle="User Account"
        leftAction="Back"
        // rightAction="Logout"
      />
      <StatusBar backgroundColor="#529d7c" barStyle="light-content" />
      <View className="px-6 flex-1 w-full items-center">
        <View className="rounded-lg p-4 w-full items-center">
          <View
            className="bg-white w-[160px] h-[160px] rounded-full border-4 border-primary justify-center overflow-hidden items-center"
            style={{ elevation: 5 }}
          >
            <Image
              source={{ uri: userDetails?.avatar }}
              className="w-full h-full rounded-full"
            />
            <TouchableOpacity
              onPress={() => router.push("screens/user-account/SetAvatar")}
              className="absolute bg-gray-300 w-full bottom-0 py-1 justify-center items-center"
            >
              <Ionicons name="camera" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-col justify-start items-center mt-2 ">
            <Text className="text-xl font-bold font-poppins">
              {userDetails?.name}
            </Text>
            <Text className="text-xs text-gray-500 font-poppins">
              {userDetails?.employee?.designation?.name}
            </Text>
            <Text className="text-xs text-gray-500 font-poppins">
              {userDetails?.employee?.department?.name}
            </Text>
            <Text className="text-xs text-gray-500 font-poppins">
              {userDetails?.email}
            </Text>
          </View>
        </View>

        <View
          className="bg-white rounded-lg px-4 py-2 w-full items-center divide-y divide-gray-400"
          style={{
            elevation: 5,
          }}
        >
          {userSettings.map((item) => {
            return (
              <TouchableOpacity
                key={item.title}
                onPress={() => item.action()}
                className="w-full flex flex-row py-2 justify-between"
              >
                <View className="flex flex-row items-center space-x-2">
                  {item.icon}
                  <Text className="ml-2 font-poppins">{item.title}</Text>
                </View>
                <View className="">
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default index;
