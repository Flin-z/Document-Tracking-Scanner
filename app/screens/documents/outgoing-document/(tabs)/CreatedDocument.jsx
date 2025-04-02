import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import StackHeader from "../../../../../components/ui/StackHeader";
import DocumentList from "../../../../../components/document/DocumentList";
import DocumentNotFound from "../../../../../components/document/DocumentNotFound";
import useInfiniteQuery from "../../../../../hooks/useInfiteQuery";
import { user } from "../../../../../store/store";
import { useAtom } from "jotai";

const index = () => {
  const [userDetails] = useAtom(user);
  const { data, isLoading, refetch, fetchNextPage } = useInfiniteQuery({
    apiKey: ["outgoing-documents", userDetails],
    apiLink: "outgoing-documents",
    defaultPagesize: 10,
  });

  const documentData = data?.pages.flatMap((page) => page.data) || [];

  const onRefresh = useCallback(() => {
    if (!isLoading) {
      setTimeout(() => {
        refetch();
      }, 3000);
    }
  }, []);

  return (
    <View className="flex-1 bg-slate-50">
      <StackHeader headerTitle={"Created Documents"} />
      <View className="flex-1 p-3 ">
        {documentData.length > 0 ? (
          <FlatList
            data={documentData}
            refreshing={isLoading}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <DocumentList
                documentType={"outgoing-document"}
                documentHashcode={item?.hashcode}
                documentNumber={item?.document_no}
                documentSubject={item?.subject}
                documentDate={item?.created_at}
                documentBottomLabel={"Created by"}
                documentBottomValue={item?.created_by?.employee.name}
                documentStatus={item?.document_status}
                documentUrgency={item?.document_urgency}
              />
            )}
            onRefresh={onRefresh}
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

export default index;
