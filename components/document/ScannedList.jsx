import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

import useAxios from "../../hooks/useAxios";
import { useRouter } from "expo-router";

const ItemAction = ({ document, onReceiveSuccess, onDeleteSuccess }) => {
  const axios = useAxios();
  const [receivedActive, setReceivedActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const postRequest = axios.post({
    key: ["receive-document", "department-documents"],
    url: "receive-document",
    onSuccess: () => {
      setReceivedActive(false);
      onReceiveSuccess(document);
    },
    onError: (err) => {
      setReceivedActive(false);
      setErrors({
        document: document,
        message: err.response.data.message,
      });
    },
  });

  const handleReceived = () => {
    setReceivedActive(true);
    onReceiveSuccess(document);

    postRequest.mutateAsync({ scan_copy: document?.scanned_copy });
  };

  const deletehandler = () => {
    Alert.alert("Delete", "Are you sure you want to remove this document?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          onDeleteSuccess(document);
          setDeleteActive(true);
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        width: 120,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={receivedActive}
        className={`w-1/2 p-3 justify-center items-center flex h-full bg-primary`}
        onPress={() =>
          Alert.alert(
            "Received Document",
            "Are you sure you want to receive this document?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                onPress: () => handleReceived(),
              },
            ]
          )
        }
      >
        {receivedActive ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <MaterialIcons name="move-to-inbox" size={24} color="white" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={deleteActive}
        className={`w-1/2 p-3 items-center justify-center h-full bg-red-400`}
        onPress={() => deletehandler()}
      >
        {deleteActive ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Entypo name="cross" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const ScannedList = ({ scannedList = [], onReceived, onDelete }) => {
  const [documentList, setDocumentList] = useState([]);
  const router = useRouter();

  const documentTypes = {
    "Internal Document": "internal-document",
    "Incoming Document": "incoming-document",
    "Outgoing Document": "outgoing-document",
  };

  useEffect(() => {
    setDocumentList(scannedList);
  }, [scannedList]);

  return (
    <View className="flex-1 w-full">
      <View className="w-full flex flex-row justify-between items-center">
        <Text
          className="text-lg text-start mb-2 w-full font-poppins text-md text-gray-700"
          style={{ fontFamily: "Poppins-Bold" }}
        >
          Scanned Documents
        </Text>
      </View>
      <ScrollView className="flex-1 w-full">
        {documentList.map((item, index) => (
          <View
            key={index}
            className="flex-1 w-full overflow-hidden mb-2  rounded-lg"
          >
            <Swipeable
              renderRightActions={() => (
                <ItemAction
                  document={item}
                  onReceiveSuccess={(document) => {
                    onReceived(document);
                  }}
                  onDeleteSuccess={(document) => {
                    onDelete(document);
                  }}
                />
              )}
              overshootLeft="false"
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  router.push({
                    pathname:
                      "screens/documents/" +
                      documentTypes[item.document_type] +
                      "/viewDocument/[hashcode]",
                    params: {
                      hashcode: item.hashcode,
                      type: item.document_type,
                    },
                  });
                }}
              >
                <View className="flex flex-row py-4 px-2 w-full justify-between bg-white">
                  <View>
                    <Ionicons name="document-text" size={36} color="#529d7c" />
                  </View>
                  <View className="flex-1 flex-col justify-center items-start px-1">
                    <Text className="text-md font-bold">{item.subject}</Text>
                    <Text className="text-md">{item.document_type}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScannedList;
