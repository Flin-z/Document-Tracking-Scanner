import { View, Text } from 'react-native'
import React from 'react'

const DocumentStatus = ({status}) => {
  return (
    <>
      <View className={`${status?.name == "New Document" ? 'border-blue-500 border':'border-orange-500 border'} px-1 py-0.5 rounded-sm self-start mb-1`} >
        <Text className={`text-[11px] ${status?.name == "New Document" ? 'text-blue-500':'text-orange-500'}`} style={{fontFamily:"Roboto-Bold"}}>{status?.name}</Text>
      </View>
    </>
  )
}

export default DocumentStatus