import { View, Text } from "react-native";
import React from "react";

const DocumentNumber = ({ document_no }) => {
  return (
    <View
      className={`bg-primary border border-primary px-1 py-0.5 rounded-sm self-start mb-1`}
    >
      <Text
        className={`text-white text-[11px]`}
        style={{ fontFamily: "Roboto-Bold" }}
      >
        {document_no}
      </Text>
    </View>
  );
};

export default DocumentNumber;
