import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import responsiveSize from '../hooks/responsiveSize';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburgerButton}>
          <Ionicons name="menu" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome to WellNest</Text>
      </View>

      {/* Upcoming Appointments Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.doctorInfo}>
            <Ionicons name="person" size={24} color="#2E7D32" />
            <View style={styles.appointmentDetails}>
              <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
              <Text style={styles.appointmentTime}>Today, 2:30 PM</Text>
              <Text style={styles.appointmentType}>General Checkup</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="calendar" size={24} color="#6399a0" />
          <Text style={styles.actionText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="document" size={24} color="#6399a0" />
          <Text style={styles.actionText}>View Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="chatbubbles" size={24} color="#6399a0" />
          <Text style={styles.actionText}>Consult Doctor</Text>
        </TouchableOpacity>
      </View>

      {/* Health Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Stay Hydrated</Text>
          <Text style={styles.tipDescription}>Drink 8 glasses of water daily.</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Daily Exercise</Text>
          <Text style={styles.tipDescription}>Aim for at least 30 minutes of activity.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: responsiveSize(40),
  },
  header: {
    padding: 20,
    backgroundColor: '#E8F5E9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  appointmentCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDetails: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666666',
  },
  rescheduleButton: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 20,
  },
  rescheduleText: {
    color: '#6399a0',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionCard: {
    alignItems: 'center',
    width: '30%',
  },
  actionText: {
    fontSize: 12,
    color: '#6399a0',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6399a0',
  },
  tipDescription: {
    fontSize: 12,
    color: '#666666',
  },
});