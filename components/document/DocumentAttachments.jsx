import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import ImageViewer from "react-native-image-viewing";

const getFileType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    pdf: "application/pdf",
  };

  return mimeTypes[ext] || "unknown";
};

const DocumentAttachments = ({ attachments }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openImage = (uri) => {
    setSelectedImage(uri);
    setVisible(true);
  };

  return (
    <>
      <View className="flex-1 mt-2 ">
        {attachments?.length == 0 ? (
          <View
            className={`flex-1 bg-gray-200 p-4 rounded-md min-h-[120px] justify-center`}
          >
            <Text
              className={`text-center text-md font-bold  text-gray-400 px-12`}
              style={{ fontFamily: "Roboto" }}
            >
              No attachments for this document.
            </Text>
          </View>
        ) : (
          <View className={`flex flex-row justify-center items-center mb-2`}>
            {/* <View className={`border-b flex-1 border-gray-400`}></View> */}
            <Text
              className={`text-gray-400 text-center text-md self-start px-2`}
              style={{ fontFamily: "Poppins-Bold" }}
            >
              Attachments
            </Text>
            <View className={`border-b flex-1 border-gray-400`}></View>
          </View>
        )}

        {attachments?.length > 0 && (
          <View className={`flex-1 flex flex-row gap-x-2  mb-4 `}>
            {attachments?.map((item, index) => {
              const type = getFileType(item?.path);

              return (
                <TouchableOpacity
                  onPress={() => {
                    return type == "application/pdf"
                      ? router.push({
                          pathname: "screens/documents/file-viewer",
                          params: {
                            type: type,
                            path: item?.path,
                            name: item?.name,
                          },
                        })
                      : openImage(item?.path);
                  }}
                  key={index}
                  className={`flex flex-col max-w-[25%] gap-y-2 p-2 bg-white rounded-md justify-center items-center overflow-hidden`}
                >
                  {type == "application/pdf" ? (
                    <AntDesign name="pdffile1" size={64} color="#529d7c" />
                  ) : (
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: item?.path,
                      }}
                      className="flex-1 w-full h-20 "
                    />
                  )}
                  <Text
                    ellipsizeMode="tail"
                    className="text-[10px] text-gray-500"
                    maxLines={2}
                    numberOfLines={1}
                    style={{ fontFamily: "Roboto" }}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {visible && (
          <ImageViewer
            visible={visible}
            imageIndex={0}
            images={[
              {
                uri: selectedImage,
              },
            ]}
            onRequestClose={() => setVisible(false)}
          />
        )}
      </View>
    </>
  );
};

export default DocumentAttachments;
