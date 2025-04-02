import { View, FlatList } from "react-native";
import React, { useCallback } from "react";
import StackHeader from "../../../components/ui/StackHeader";

import useAxios from "../../../hooks/useAxios";
import useInfiniteQuery from "../../../hooks/useInfiteQuery";

import DocumentNotFound from "../../../components/document/DocumentNotFound";
import DocumentReceivedCard from "../../../components/document/DocumentReceivedCard";

const RecentlyReceived = () => {
  const { data, isLoading, refetch, fetchNextPage } = useInfiniteQuery({
    apiKey: ["recently-received-documents"],
    apiLink: "recently-received-documents",
  });

  console.log(data?.pages[0]?.data);

  const onRefresh = useCallback(() => {
    if (!isLoading) {
      setTimeout(() => {
        refetch();
      }, 3000);
    }
  }, []);

  return (
    <View className="flex-1 w-full items-center">
      <StackHeader headerTitle="Recently Received Documents" />
      <View className="w-full p-4">
        {data?.pages[0]?.data?.length > 0 ? (
          <FlatList
            refreshing={isLoading}
            onRefresh={onRefresh}
            data={data?.pages[0]?.data}
            renderItem={({ item }) => (
              <DocumentReceivedCard document={item} key={item.id} />
            )}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <DocumentNotFound />
        )}
      </View>
    </View>
  );
};

export default RecentlyReceived;
