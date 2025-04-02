import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const DocumentReceiver = ({ name, recievedDate }) => {
  return (
    <View className={`flex flex-1 mb-2`}>
      <View
        className={`flex flex-row items-center gap-x-1 self-start border rounded-sm bg-primary border-primary overflow-hidden`}
      >
        <Text className={`px-1 text-[10px] text-white`}>
          Received by: {name}
        </Text>
        <Text className="px-1 text-[10px] text-gray-500 bg-white">
          {moment(recievedDate).format("hh:mm a MMMM DD, YYYY")}
        </Text>
      </View>
    </View>
  );
};

export default DocumentReceiver;
