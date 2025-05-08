import { View, Text } from 'react-native'
import React from 'react'

export default function ProfileScreen({ navigation, route }) {
  const { user } = route.params;
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>{user}</Text>
    </View>
  )
}