import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import useAxios from "../../../../../hooks/useAxios";
import moment from "moment";

import StackHeader from "../../../../../components/ui/StackHeader";
import DocumentStatus from "../../../../../components/document/DocumentStatus";
import DocumentUrgency from "../../../../../components/document/DocumentUrgency";
import DocumentNumber from "../../../../../components/document/DocumentNumber";
import DocumentRoutes from "../../../../../components/document/DocumentRoutes";
import DocumentComment from "../../../../../components/document/DocumentComment";
import DocumentAttachments from "../../../../../components/document/DocumentAttachments";

const ViewInternalDocument = () => {
  const { hashcode } = useLocalSearchParams();
  const axios = useAxios();

  const { data, refetch } = axios.get({
    key: ["internal-documents", hashcode],
    url: "internal-documents/" + hashcode,
  });

  return (
    <View className={`flex flex-1`}>
      <StackHeader headerTitle={"Internal Document"} />
      <ScrollView className={`flex-1`}>
        <View className="p-4 bg-slate-10 h-full">
          <View className="flex flex-row gap-x-2">
            <View>
              <DocumentNumber document_no={data?.document_no} />
            </View>
            <View>
              <DocumentStatus status={data?.document_status} />
            </View>
            <View>
              <DocumentUrgency urgency={data?.document_urgency} />
            </View>
          </View>
          <View
            className={`bg-white p-3 rounded-md mt-2 min-h-[120px] justify-between`}
            style={{ elevation: 2 }}
          >
            <View>
              <Text className={`text-md`} style={{ fontFamily: "Roboto" }}>
                Subject: <Text className={`font-bold`}>{data?.subject}</Text>{" "}
              </Text>
              <Text className={`text-xs`} style={{ fontFamily: "Roboto" }}>
                Description: <Text>{data?.description}</Text>{" "}
              </Text>
              <Text className={`text-xs`} style={{ fontFamily: "Roboto" }}>
                Category: <Text>{data?.document_category?.name}</Text>{" "}
              </Text>
            </View>
            <View className="flex flex-row mt-2 justify-between items-center">
              <Text className="text-[10px] text-gray-500">
                Created by: {data?.created_by?.name}
              </Text>
              <Text className="text-[10px] text-gray-500">
                {moment(data?.created_at).format("MMMM DD, YYYY")} (
                {moment(data?.created_at).fromNow()})
              </Text>
            </View>
          </View>

          <DocumentAttachments attachments={data?.attachments} />

          <DocumentComment
            comments={data?.document_comments}
            currentRoute={data?.current_routes[0]}
            onCommentSuccess={refetch()}
          />

          <DocumentRoutes copies={data?.document_copies} document={data} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewInternalDocument;
