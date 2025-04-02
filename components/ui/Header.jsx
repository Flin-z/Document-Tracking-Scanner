import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";

// Atoms
import { user } from "../../store/store";

// Hooks
import { useAtom } from "jotai";

const Header = ({ openRightDrawer }) => {
  const [userDetails] = useAtom(user);

  const greetUser = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className=" flex flex-row justify-between p-4 items-center">
      <View className="flex flex-row items-center gap-2">
        <View className="items-center justify-center w-10 h-10 bg-slate-100 rounded-full overflow-hidden border-2 border-primary">
          {userDetails?.avatar ? (
            <Image
              source={{ uri: userDetails.avatar }}
              className="w-full h-full"
            />
          ) : (
            <Text className={`text-lg font-bold text-gray-500`}>
              {userDetails && userDetails?.name[0]}
            </Text>
          )}
        </View>
        <View className=" justify-center items-start">
          <Text className="text-xs leading-0 text-gray-500 font-poppins">
            {greetUser()},
          </Text>
          <Text className="text-start -mt-1  text-lg font-poppins-bold font-bold leading-0">
            {userDetails?.name}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={openRightDrawer}>
          <Octicons name="three-bars" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
