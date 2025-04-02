import { View, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import React, { useRef, useState } from "react";
import StackHeader from "../../../components/ui/StackHeader";
import ImageViewer from "react-native-image-viewing";

const SetAvatar = () => {
  const Camera = useRef(null);
  const Camera2 = useRef(null);
  const [image, setImage] = useState(null);

  const pictureHandler = async () => {
    const data = await Camera2.current.takePictureAsync();
    setImage(data.uri);
  };

  return (
    <View className="flex-1 w-full items-center">
      <StackHeader headerTitle="Set Avatar" />

      <CameraView
        ref={Camera}
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="flex-1 w-full h-full justify-center items-center bg-black">
          <View className="flex-1 z-40 rounded-full w-[300px] h-[300px] top-40 items-center justify-center absolute overflow-hidden">
            <CameraView
              ref={Camera2}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        </View>
      </CameraView>
      <View className="flex-1 w-full bottom-0 bg-gray-500 py-4 items-center justify-center absolute ">
        <TouchableOpacity
          onPress={pictureHandler}
          className="p-1 bg-white  rounded-full"
        >
          <Image
            source={require("../../../assets/images/shutter-camera.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </View>
      {image && (
        <ImageViewer
          visible={true}
          imageIndex={0}
          images={[{ uri: image }]}
          onRequestClose={() => setImage(null)}
        />
      )}
    </View>
  );
};

export default SetAvatar;
