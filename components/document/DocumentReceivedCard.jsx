import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import DocumentUrgency from "./DocumentUrgency";
import DocumentNumber from "./DocumentNumber";
import DocumentType from "./DocumentType";
import moment from "moment";
import { useRouter } from "expo-router";

const DocumentReceivedCard = ({ document }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        if (document?.document_type === "Internal Document") {
          router.push({
            pathname:
              "screens/documents/internal-document/viewReceivedDocument/[hashcode]",
            params: { hashcode: document?.copy_details?.document?.hashcode },
          });
        } else if (document?.document_type === "Incoming Document") {
          router.push({
            pathname:
              "screens/documents/incoming-document/viewReceivedDocument/[hashcode]",
            params: { hashcode: document?.copy_details?.document?.hashcode },
          });
        } else if (document?.document_type === "Outgoing Document") {
          router.push({
            pathname:
              "screens/documents/outgoing-document/viewReceivedDocument/[hashcode]",
            params: { hashcode: document?.copy_details?.document?.hashcode },
          });
        }
      }}
    >
      <View className="w-full rounded-lg border bg-slate-50 border-gray-300 my-1 p-3">
        <View className="flex-1 flex-row justify-between gap-x-2">
          <View className="flex-1 flex-row gap-x-2">
            <DocumentNumber
              document_no={document?.copy_details?.document?.document_no}
            />
            <DocumentUrgency
              urgency={document?.copy_details?.document?.document_urgency}
            />
          </View>
          <View className="flex-2 flex-row items-end justify-end ">
            <DocumentType documentType={document?.document_type} />
          </View>
        </View>
        <Text
          className={`text-[14px] mb-2`}
          style={{ fontFamily: "Roboto-Bold" }}
        >
          {document.copy_details.document.subject}
        </Text>
        <View className="flex flex-row gap-x-1 justify-between">
          <Text
            className="text-gray-800 text-[10px]"
            style={{ fontFamily: "Roboto-Bold" }}
          >
            Received by: {document?.received_by?.name}
          </Text>
          <Text
            className="text-[10px] text-gray-400"
            style={{ fontFamily: "Roboto-Bold" }}
          >
            {moment(document?.received_at).format("hh:mm a MMMM DD, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentReceivedCard;
