import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Link } from 'expo-router';


export  default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeText}>Marhay na aga, Ma'am!</Text>
            <Ionicons name="woman-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.statusText}>Your 24th Week Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.iconBox, { backgroundColor: '#7B1FA2' }]}>
                <Ionicons name="calendar-outline" color="#fff" size={20} />
              </View>
              <Text style={styles.cardLabel}>Next Checkup</Text>
              <Text style={styles.cardValue}>Jan 20</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.iconBox, { backgroundColor: '#4A148C' }]}>
                <Ionicons name="bar-chart-outline" color="#fff" size={20} />
              </View>
              <Text style={styles.cardLabel}>Health Log</Text>
              <Text style={styles.cardValue}>Normal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barangay Alerts */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Barangay Alerts</Text>
            <Ionicons name="notifications-outline" size={16} color="#7B1FA2" />
          </View>

          <AlertCard
            icon="checkmark-circle-outline"
            iconColor="#7B1FA2"
            title="Vaccination Drive"
            desc="Brgy. Calauag Hall - Today, 9AM"
          />
 
          <AlertCard
            icon="alert-circle-outline"
            iconColor="#BA68C8"
            title="Prenatal Vitamin Refill"
            desc="Visit the Health Center this week"
          />
        </View>
                <Link href="/login">
            <Text>Login</Text>
        </Link>

      </ScrollView>
    </SafeAreaView>
  );
}
function AlertCard({
  icon,
  iconColor,
  title,
  desc,
}: {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.alertCard}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
      <View style={styles.alertTextContent}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#CCC" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F6FB' },
  scrollContent: { padding: 16, paddingBottom: 32 },

 headerCard: {
    backgroundColor: '#6A1B9A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    marginTop: 50,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { fontSize: 20, fontWeight: '700', color: '#FFF' },
  statusText: { marginTop: 8, fontSize: 14, color: '#E1CDEB' },
  progressBar: { height: 8, backgroundColor: '#ddd', borderRadius: 4, marginTop: 12 },
  progressFill: { height: 8, backgroundColor: '#FFF', borderRadius: 4 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },

  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: { padding: 12, borderRadius: 12, marginBottom: 8 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#111' },
  cardValue: { fontSize: 12, color: '#555' },

  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },

  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  alertTextContent: { flex: 1, marginLeft: 8 },
  alertTitle: { fontSize: 14, fontWeight: '600', color: '#111' },
  alertDesc: { fontSize: 12, color: '#555' },
});
