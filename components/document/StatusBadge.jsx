import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../vars/index";

const StatusBadge = ({ statusId, children, style }) => {
  const colorMap = {
    1: Colors.Blue,
    2: Colors.Orange,
    3: Colors.PrimaryColor,
  };

  return (
    <View
      style={[
        {
          borderColor: colorMap[statusId] || "#444",
          backgroundColor: colorMap[statusId] || "#444",
          paddingHorizontal: 8,
          paddingVertical: 1,
          borderRadius: 5,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 10,
          fontFamily: "Roboto-Bold",
          color: "#FFF",
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  Badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginVertical: 5,
    borderRadius: 20,
    fontSize: 12,
  },
});
