import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useTimeFormatter from "../../hooks/useTimeFormatter";
import { user } from "../../store/store";
import { useAtom } from "jotai";
import AppInput from "../../components/forms/AppInput";
import AppButton from "../../components/forms/AppButton";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";

const DocumentComment = ({
  comments = null,
  currentRoute,
  onCommentSuccess,
}) => {
  const [userDetails] = useAtom(user);
  const { control, handleSubmit, setError, reset } = useForm();
  const axios = useAxios();

  const addComment = axios.post({
    key: ["document-comments"],
    url: "document-comments",
    onSuccess: () => onCommentSuccess(),
  });

  const addCommentHandler = (data) => {
    if (!data.comment) {
      setError("comment", {
        type: "custom",
        message: "Please add your comment",
      });
    } else {
      addComment.mutate({ route_id: currentRoute?.route_id, ...data });
      reset();
    }
  };

  return (
    <View className={`mt-4`}>
      {comments?.length == 0 ? (
        <View
          className={`flex-1 bg-gray-200 p-4 rounded-md min-h-[120px] justify-center`}
        >
          <Text
            className={`text-center text-sm  text-gray-400 px-12`}
            style={{ fontFamily: "Poppins-Bold" }}
          >
            No comments for this document.
          </Text>
        </View>
      ) : (
        <View className={`flex flex-row justify-center items-center`}>
          {/* <View className={`border-b flex-1 border-gray-400`}></View> */}
          <Text
            className={`text-gray-400 text-center  text-md self-start px-2`}
            style={{ fontFamily: "Poppins-Bold" }}
          >
            Comments
          </Text>
          <View className={`border-b flex-1 border-gray-400`}></View>
        </View>
      )}
      {comments?.map((comment, index) => {
        return (
          <View
            key={index}
            className={`flex-1 bg-white rounded-md p-3 mt-3 `}
            style={{ elevation: 2 }}
          >
            <View className={`flex-1 flex flex-row justify-between`}>
              <View
                className={`flex flex-row flex-1 items-center gap-1 self-start`}
              >
                <Text
                  className={`text-[14px]`}
                  style={{ fontFamily: "Roboto-Bold" }}
                >
                  {comment?.comment_by?.employee?.name}
                </Text>
                <Text
                  className={`text-[11px] text-gray-400`}
                  style={{ fontFamily: "Roboto-Bold" }}
                >
                  {comment?.comment_department?.name}
                </Text>
              </View>
            </View>
            <Text
              className={`text-gray-400 text-[10px] `}
              style={{ fontFamily: "Roboto-Bold" }}
            >
              {useTimeFormatter(comment?.created_at)}
            </Text>
            <Text
              className={`text-[13px] mt-1`}
              style={{ fontFamily: "Roboto" }}
            >
              {comment?.comment}
            </Text>
          </View>
        );
      })}
      {userDetails?.employee?.department?.id ==
        currentRoute?.received_department_id && (
        <View
          className={`bg-white flex-1 p-2 rounded-md mt-3`}
          style={{ elevation: 2 }}
        >
          <View className={`mb-1`}>
            <AppInput
              control={control}
              name={"comment"}
              placeholder={"Add comment"}
              isRequired={true}
              isMultiline={true}
              numberOfLines={4}
            />
          </View>
          <AppButton
            className={`self-end`}
            onPress={handleSubmit(addCommentHandler)}
          >
            <Text>Add Comment</Text>
          </AppButton>
        </View>
      )}
    </View>
  );
};

export default DocumentComment;
