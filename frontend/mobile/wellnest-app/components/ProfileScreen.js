import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ProfileScreen({ navigation, route }) {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
