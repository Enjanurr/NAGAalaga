import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeText}>Barangay Alerts</Text>
            <Ionicons name="notifications-outline" size={26} color="#FFF" />
          </View>
          <Text style={styles.statusText}>
            Stay updated with health programs
          </Text>
        </View>

        {/* Today's Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today’s Alerts</Text>

          <View style={[styles.alertCard, styles.successBorder]}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>Vaccination Drive</Text>
              <Text style={styles.alertDesc}>
                Brgy. Calauag Hall · Today, 9:00 AM
              </Text>
              <Text style={styles.alertTime}>Posted 2 hours ago</Text>
            </View>
          </View>

          <View style={[styles.alertCard, styles.warningBorder]}>
            <Ionicons name="alert-circle-outline" size={24} color="#FF9800" />
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>Prenatal Vitamin Refill</Text>
              <Text style={styles.alertDesc}>
                Visit the Health Center this week
              </Text>
              <Text style={styles.alertTime}>Posted yesterday</Text>
            </View>
          </View>
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>

          <View style={[styles.alertCard, styles.purpleBorder]}>
            <Ionicons name="calendar-outline" size={24} color="#7B1FA2" />
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>Free Prenatal Checkup</Text>
              <Text style={styles.alertDesc}>
                City Health Office · Jan 22, 8AM–5PM
              </Text>
              <Text style={styles.alertTime}>In 4 days</Text>
            </View>
          </View>

          <View style={[styles.alertCard, styles.infoBorder]}>
            <Ionicons name="heart-outline" size={24} color="#2196F3" />
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>
                Pregnancy Wellness Workshop
              </Text>
              <Text style={styles.alertDesc}>
                Barangay Hall · Jan 28, 2:00 PM
              </Text>
              <Text style={styles.alertTime}>In 10 days</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  headerCard: {
    backgroundColor: '#6A1B9A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    marginTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  statusText: {
    marginTop: 8,
    fontSize: 14,
    color: '#E1CDEB',
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  successBorder: { borderLeftColor: '#4CAF50' },
  warningBorder: { borderLeftColor: '#FF9800' },
  purpleBorder: { borderLeftColor: '#7B1FA2' },
  infoBorder: { borderLeftColor: '#2196F3' },

  alertTextContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  alertDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
});

