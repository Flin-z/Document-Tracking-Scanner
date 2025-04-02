import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
// Components
import StackHeader from "../../../components/ui/StackHeader";

// Hooks
import { useRouter } from "expo-router";
import HomeMenu from "../../../components/ui/HomeMenu";
import OutgoingImage from "../../../assets/images/outgoing-document.png";
import IncomingImage from "../../../assets/images/incoming-document.png";
import InternalImage from "../../../assets/images/internal-document.png";

const index = () => {
  const router = useRouter();

  const documentMenu = [
    {
      title: "Internal Document",
      image: InternalImage,
      location: "screens/documents/internal-document",
      description:
        "Documents that are circulated and shared across the organization, ensuring seamless communication and collaboration.",
    },
    {
      title: "Incoming Document",
      image: IncomingImage,
      location: "screens/documents/incoming-document",
      description:
        "Documents received by BRHMC from other agencies, encompassing various types of correspondence.",
    },
    {
      title: "Outgoing Document",
      image: OutgoingImage,
      location: "screens/documents/outgoing-document",
      description:
        "Documents that are sent from the organization to other agencies, facilitating communication and collaboration beyond internal operations.",
    },
  ];

  return (
    <View className="flex-1 w-full items-start bg-white">
      <StackHeader headerTitle="Documents" />
      <View className="flex-1 w-full p-4 gap-y-8">
        {documentMenu.map((item, index) => (
          <HomeMenu
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            onPress={() => router.push(item.location)}
          />
        ))}
      </View>
    </View>
  );
};

export default index;
