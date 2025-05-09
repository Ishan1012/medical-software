import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import useGetAppointments from '../hooks/useGetAppointments';

export default function DetailsScreen({ navigation, route }) {
  const { appointment } = route.params;
  return (
    <View style={styles.container}>
      <Text>Appointment Details {appointment.id}</Text>
      <Text>{appointment.date}</Text>
      <Text>{appointment.time}</Text>
      <Text>{appointment.doctor}</Text>
      <Text>{appointment.type}</Text>
      <Text>{appointment.status}</Text>
      <Text>{appointment.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});