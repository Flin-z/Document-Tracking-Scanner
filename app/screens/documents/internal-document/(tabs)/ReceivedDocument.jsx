import { View, FlatList } from "react-native";
import React from "react";
import StackHeader from "../../../../../components/ui/StackHeader";
import DocumentList from "../../../../../components/document/DocumentList";
import DocumentNotFound from "../../../../../components/document/DocumentNotFound";
import useInfiniteQuery from "../../../../../hooks/useInfiteQuery";
import { user } from "../../../../../store/store";
import { useAtom } from "jotai";

const ReceivedDocument = () => {
  const [userDetails] = useAtom(user);
  const { data, isLoading, refetch, fetchNextPage } = useInfiniteQuery({
    apiKey: ["received-documents/internal", userDetails],
    apiLink: "received-documents/internal",
    defaultPagesize: 10,
  });

  const documentData = data?.pages.flatMap((page) => page.data) || [];

  return (
    <View className="flex-1 bg-slate-100">
      <StackHeader headerTitle={"Received Documents"} />
      <View className="flex-1 p-3">
        {documentData.length > 0 ? (
          <FlatList
            data={documentData}
            refreshing={isLoading}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <DocumentList
                documentType={"internal-document"}
                documentHashcode={item?.copy_details?.document.hashcode}
                documentNumber={item?.copy_details?.document?.document_no}
                documentSubject={item?.copy_details?.document?.subject}
                documentDate={item?.created_at}
                documentBottomLabel={"Received by"}
                documentBottomValue={item?.received_by?.employee?.name}
                documentStatus={item?.copy_details?.document?.document_status}
                documentUrgency={item?.copy_details?.document?.document_urgency}
                openReceived={true}
              />
            )}
            onRefresh={() => refetch()}
            onEndReached={() => {
              if (data?.pageParams.length < data?.pages[0].last_page) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <DocumentNotFound />
        )}
      </View>
    </View>
  );
};

export default ReceivedDocument;
