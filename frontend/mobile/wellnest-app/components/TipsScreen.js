import { View, Text } from 'react-native'
import React from 'react'

export default function TipsScreen({ route }) {
  const { id } = route.params;
  return (
    <View>
      <Text>TipsScreen {id}</Text>
    </View>
  )
}