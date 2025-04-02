import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

const DocumentCarousel = ({ documents }) => {
  const width = Dimensions.get("window").width;

  return (
    <Carousel
      loop
      width={width - 32}
      height={120}
      autoPlay={true}
      autoPlayInterval={6000}
      data={documents}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View
          className=" flex-1 rounded-lg bg-primary p-2 mx-1 shadow-md"
          style={{ elevation: 5 }}
        >
          <Text
            className="uppercase font-bold text-center text-white text-md mb-2"
            style={{ fontFamily: "poppins" }}
          >
            {item?.type}
          </Text>
          <View className="flex flex-row items-center justify-center rounded-md gap-3">
            <View className="flex flex-row items-center justify-center flex-1 bg-white rounded-xl gap-x-2 p-3">
              <View className="flex">
                <Image
                  source={require("../../assets/images/document.png")}
                  className="flex-1 w-14 h-14"
                />
              </View>
              <View className="flex flex-col items-center justify-center">
                <Text className="font-bold text-3xl">{item?.created}</Text>
                <Text className="text-md font-poppins font-bold ">Created</Text>
              </View>
            </View>
            <View className="flex flex-1 flex-row items-center justify-center rounded-xl bg-white gap-x-2 p-3">
              <View className="flex">
                <Image
                  source={require("../../assets/images/received.png")}
                  className="flex-1 w-14 h-14
                  "
                />
              </View>
              <View className="flex flex-col items-center justify-center">
                <Text className="font-bold text-3xl ">{item?.received}</Text>
                <Text className="text-md font-poppins font-bold ">
                  Received
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default DocumentCarousel;
