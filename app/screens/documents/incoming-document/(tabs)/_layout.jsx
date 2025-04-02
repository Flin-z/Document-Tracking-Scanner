import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { user } from "../../../../../store/store";
import { useAtom } from "jotai";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const _layout = () => {
  const [userDetails] = useAtom(user);

  return (
    <Tabs
      initialRouteName={
        userDetails?.employee?.department?.name == "MCC"
          ? "CreatedDocument"
          : "ReceivedDocument"
      }
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#529d7c",
        tabBarInactiveBackgroundColor: "#FFF",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#333",
        tabBarStyle: {
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
          borderBottomStartRadius: 8,
          borderBottomEndRadius: 8,
          marginHorizontal: 12,
          marginBottom: 12,
          elevation: 2,
        },
      }}
    >
      {userDetails?.employee?.department?.name == "MCC" ? (
        <Tabs.Screen
          name="CreatedDocument"
          options={{
            title: "Documents",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="file-document-multiple-outline"
                size={24}
                color={focused ? "#fff" : "#333"}
              />
            ),
          }}
        />
      ) : null}
      <Tabs.Screen
        name="ReceivedDocument"
        options={{
          title: "Received Documents",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="document-scanner"
              size={24}
              color={focused ? "#fff" : "#333"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
