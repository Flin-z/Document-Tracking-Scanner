import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const Routes = ({ routes }) => {
  return routes?.map((route, index) => {
    return (
      <RouteCard
        key={index}
        route={route}
        topLine={index != 0}
        bottomLine={true}
      />
    );
  });
};

const RouteCard = ({
  document,
  route,
  topLine = false,
  bottomLine = false,
}) => {
  return (
    <View className={`flex flex-row`}>
      <View className={`flex w-[30px]`}>
        <View className={`self-center flex-1 items-center justify-center`}>
          <View
            className={`flex-1 ${
              topLine && "border-l"
            }  w-1/2 self-center border-gray-300`}
          ></View>
          <View
            className={`w-[12px] h-[12px] rounded-full self-center ${
              topLine ? "bg-gray-300" : "bg-primary"
            }`}
          >
            <Text className={`text-center text-white`}></Text>
          </View>
          <View
            className={`flex-1 ${
              bottomLine && "border-l"
            }  w-1/2 self-center border-gray-300`}
          ></View>
        </View>
      </View>
      <View className={`flex-1 rounded-md py-3`}>
        <View
          className={`bg-white p-2 rounded-md flex-1 text-sm  ${
            topLine && "opacity-70 "
          }`}
          style={{ elevation: topLine ? 0 : 2 }}
        >
          {document?.department?.name ? (
            <View>
              <Text
                className={`flex mb-2 justify-center font-bold ${
                  topLine
                    ? "text-gray-500 text-[11px] "
                    : "text-primary text-[14px]"
                } `}
              >
                {document?.department?.name}
              </Text>
              <Text
                className={`text-gray-500 text-[11px]`}
                style={{ fontFamily: "Roboto" }}
              >
                <Text className={`font-bold`}>
                  {document?.created_by?.name}{" "}
                </Text>
                created the document.
              </Text>
              <Text className={`text-gray-500 text-[11px]`}>
                {moment(document?.created_at).format("hh:mm a MMMM DD, YYYY")}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                className={`flex mb-2 justify-center font-bold ${
                  topLine
                    ? "text-gray-500 text-[11px] "
                    : "text-primary text-[14px]"
                } `}
              >
                {route?.received_department.name}
              </Text>
              <Text
                className={` text-gray-500 text-[11px]`}
                style={{ fontFamily: "Roboto" }}
              >
                <Text className={`font-bold`}>{route?.received_by?.name} </Text>
                received the document.
              </Text>
              <Text className={`text-gray-500 text-[11px] `}>
                {moment(route?.created_at).format("hh:mm a MMMM DD, YYYY")}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const DocumentRoutes = ({ copies, document }) => {
  const hasRoutes = copies?.some((copy) => copy?.routes.length > 0);

  return (
    <View className={`flex mt-6`}>
      {!hasRoutes && (
        <View
          className={`flex-1 bg-gray-200 p-4 rounded-md min-h-[120px] justify-center`}
        >
          <Text
            className={`text-center text-sm  text-gray-400 px-12`}
            style={{ fontFamily: "Roboto-Bold" }}
          >
            The document is not yet received by the other department.
          </Text>
        </View>
      )}

      {hasRoutes && (
        <View className={`flex-1`}>
          <View className={`flex flex-row justify-center items-center`}>
            {/* <View className={`border-b flex-1 border-gray-400`}></View> */}
            <Text
              className={`text-gray-400 text-center font-bold text-md self-start px-2`}
              style={{ fontFamily: "Roboto" }}
            >
              Document Routes
            </Text>
            <View className={`border-b flex-1 border-gray-400`}></View>
          </View>
          {copies?.map((copy, index) => {
            const copyHasRoute = copy?.routes.length > 0;

            return (
              <View key={index}>
                <Text
                  className={`text-gray-500 font-bold px-2 mt-2`}
                  style={{ fontFamily: "Poppins" }}
                >
                  Routing Slip Copy {index + 1}/{copies.length}{" "}
                </Text>
                {copy.routes.length > 0 && <Routes routes={copy.routes} />}
                <RouteCard document={document} topLine={copyHasRoute} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DocumentRoutes;
