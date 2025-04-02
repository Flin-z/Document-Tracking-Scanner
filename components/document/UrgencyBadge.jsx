import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../vars/index";

const UrgencyBadge = ({ urgencyId, children, style }) => {
  const colorMap = {
    1: "bg-red-500",
    2: "bg-primary",
  };

  return (
    <View
      className={`flex-1 justify-center items-center text-whit px-2 py-1 text-xs rounded-md ${colorMap[urgencyId]}`}
    >
      <Text className="text-xs text-white font-bold">{children}</Text>
    </View>
  );
};

export default UrgencyBadge;

const styles = StyleSheet.create({});
