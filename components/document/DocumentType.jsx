import { View, Text } from "react-native";
import React from "react";

const DocumentType = ({ documentType }) => {
  return (
    <View
      className={`px-1 py-0.5 border border-gray-400 rounded-sm self-start mb-1`}
    >
      <Text
        className={`text-[10px] text-gray-400 uppercase`}
        style={{ fontFamily: "Roboto-Bold" }}
      >
        {documentType}
      </Text>
    </View>
  );
};

export default DocumentType;
