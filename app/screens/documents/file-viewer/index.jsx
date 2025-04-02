import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import StackHeader from "../../../../components/ui/StackHeader";
import { useLocalSearchParams } from "expo-router";
import Pdf from "react-native-pdf";
import * as WebBrowser from "expo-web-browser";
const index = () => {
  const { type, path } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <StackHeader
        title="File Viewer"
        rightAction={
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(path)}>
            <Text className="text-white" stye={{ fontFamily: "Poppins" }}>
              Download
            </Text>
          </TouchableOpacity>
        }
      />

      <View className="flex-1 w-full h-10">
        {type == "application/pdf" ? (
          <Pdf
            onError={(err) => {
              console.log(err);
            }}
            enableDoubleTapZoom={true}
            trustAllCerts={false}
            style={{ flex: 1 }}
            source={{
              uri: path,
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default index;
