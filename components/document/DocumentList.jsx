import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useNavigation } from "expo-router";
import DocumentUrgency from "./DocumentUrgency";
import DocumentStatus from "./DocumentStatus";
import DocumentNumber from "./DocumentNumber";
import { useRouter } from "expo-router";

const DocumentList = ({
  documentType,
  documentHashcode,
  documentNumber,
  documentStatus,
  documentSubject,
  documentUrgency,
  documentDate,
  documentBottomLabel,
  documentBottomValue,
  openReceived = false,
}) => {
  const router = useRouter();

  const onViewHandler = () => {
    if (documentType === "internal-document" && openReceived === false) {
      router.push({
        pathname: "screens/documents/internal-document/viewDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    } else if (documentType === "internal-document" && openReceived === true) {
      router.push({
        pathname:
          "screens/documents/internal-document/viewReceivedDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    } else if (documentType === "incoming-document" && openReceived === false) {
      router.push({
        pathname: "screens/documents/incoming-document/viewDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    } else if (documentType === "incoming-document" && openReceived === true) {
      router.push({
        pathname:
          "screens/documents/incoming-document/viewReceivedDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    } else if (documentType === "outgoing-document" && openReceived === false) {
      router.push({
        pathname: "screens/documents/outgoing-document/viewDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    } else if (documentType === "outgoing-document" && openReceived === true) {
      router.push({
        pathname:
          "screens/documents/outgoing-document/viewReceivedDocument/[hashcode]",
        params: { hashcode: documentHashcode },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onViewHandler()}
      className="flex-row justify-between m-2 rounded-md relative bg-white p-3"
      style={{ elevation: 3 }}
    >
      <View className="flex-1 relative">
        <View className={`flex flex-row gap-x-2`}>
          <View>
            <DocumentNumber document_no={documentNumber} />
          </View>
          <View>
            <DocumentStatus status={documentStatus} />
          </View>
          <View>
            <DocumentUrgency urgency={documentUrgency} />
          </View>
        </View>

        <Text className="text-md " style={{ fontFamily: "Roboto-Bold" }}>
          {documentSubject}
        </Text>
        {/* <Text className="text-sm text-gray-700">{item?.description}</Text> */}
        <View className="flex flex-row justify-between items-center">
          <Text
            className="text-[10px] text-gray-500"
            style={{ fontFamily: "Roboto" }}
          >
            {documentBottomLabel + ": " + documentBottomValue}
          </Text>
          <Text
            className="text-[10px] text-gray-500"
            style={{ fontFamily: "Roboto" }}
          >
            {moment(documentDate).format("MMMM DD, YYYY")} (
            {moment(documentDate).fromNow()})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentList;
