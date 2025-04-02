import { View, Text } from 'react-native'
import React from 'react'

const DocumentUrgency = ({ urgency }) => {
  return (
    <>
      <View
        className={`${
          urgency?.name == 'Urgent' ? 'border-red-500' : 'border-primary '
        } border px-1 py-0.5 rounded-sm self-start`}
      >
        <Text
          className={`${
            urgency?.name == 'Urgent' ? 'text-red-500' : 'text-primary'
          } text-[11px]`}
          style={{ fontFamily: 'Roboto-Bold' }}
        >
          {urgency?.name}
        </Text>
      </View>
    </>
  )
}

export default DocumentUrgency
