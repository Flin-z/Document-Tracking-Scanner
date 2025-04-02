import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Foundation, MaterialIcons } from "@expo/vector-icons";

import Header from "../../components/ui/Header";
import HomeMenu from "../../components/ui/HomeMenu";
import DocumentReceivedCard from "../../components/document/DocumentReceivedCard";
import DocumentCarousel from "../../components/document/DocumentCarousel";

import { useRouter } from "expo-router";
import useAxios from "../../hooks/useAxios";

const index = () => {
  const router = useRouter();
  const axios = useAxios();
  const width = Dimensions.get("window").width;
  const [documents, setDocuments] = useState();

  const getRequest = axios.get({
    key: ["department-documents"],
    url: "department-documents",
  });

  useEffect(() => {
    if (getRequest.isSuccess) {
      setDocuments(Object.values(getRequest.data?.documents));
    }
  }, [getRequest.isSuccess]);

  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar backgroundColor="#F1F5F9" barStyle="light-content" />

      <View className="flex-1">
        <Header openRightDrawer={() => router.push("screens/user-account")} />

        <View className="flex-1 items-center px-4">
          <Text
            className="text-lg text-start mb-2 w-full font-poppins text-md text-gray-700"
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Dashboard
          </Text>

          {/* Document Carousel */}
          <DocumentCarousel documents={documents} />

          <View className="w-full gap-y-12 mt-8">
            <HomeMenu
              image={require("../../assets/images/scan.png")}
              title="Scan Document"
              description="Use the 'Scan Document' feature to quickly capture and receive documents by scanning their QR codes."
              onPress={() => router.push("screens/scan")}
            />

            <HomeMenu
              image={require("../../assets/images/documents.png")}
              title="Documents"
              description="Manage your documents with ease by adding, editing, and deleting them."
              onPress={() => router.push("screens/documents")}
            />
          </View>

          <View className="mt-6 w-full flex-row items-center justify-between mb-2">
            <Text
              className="text-lg font-bold text-md text-start  text-gray-700"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              Recently Received Documents
            </Text>
            <TouchableOpacity onPress={() => getRequest.refetch()}>
              <MaterialIcons name="refresh" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Recently Received Documents */}
          <FlatList
            className="w-full"
            refreshing={getRequest.isFetching}
            onRefresh={getRequest.refetch}
            data={getRequest?.data?.recently_received}
            contentContainerStyle={{ gap: 2, paddingBottom: 20 }}
            keyExtractor={(item) => item.id}
            renderItem={({ index, item }) => (
              <DocumentReceivedCard key={index} document={item} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default index;
