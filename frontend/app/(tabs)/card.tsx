import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PinkCard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeText}>Digital Pink Card</Text>
            <Ionicons name="document-text-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.statusText}>Your complete prenatal record</Text>
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Name" value="Maria Clara Santos" />
            <InfoRow label="Age" value="28 years old" />
            <InfoRow label="Barangay" value="Calauag" />
            <InfoRow label="Expected Due Date" value="May 15, 2025" />
          </View>
        </View>

        {/* Prenatal Checkups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Checkup History</Text>

          <CheckupCard
            month="JAN"
            day="15"
            title="Regular Prenatal Visit"
            desc1="Blood pressure: 110/70 | Weight: 65kg"
            desc2="Status: Normal"
            icon="checkmark-circle-outline"
            iconColor="#4CAF50"
          />

          <CheckupCard
            month="DEC"
            day="18"
            title="Ultrasound Screening"
            desc1="Baby development: On track"
            desc2="Status: Normal"
            icon="checkmark-circle-outline"
            iconColor="#4CAF50"
          />
        </View>

        {/* Vaccinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccination Record</Text>

          <VaccineCard
            title="Tetanus Toxoid (TT1)"
            date="Completed: Aug 10, 2024"
            icon="checkmark-circle-outline"
            iconColor="#4CAF50"
          />

          <VaccineCard
            title="Tetanus Toxoid (TT2)"
            date="Completed: Sep 15, 2024"
            icon="checkmark-circle-outline"
            iconColor="#4CAF50"
          />

          <VaccineCard
            title="Influenza Vaccine"
            date="Scheduled: Jan 25, 2025"
            icon="alert-circle-outline"
            iconColor="#FF9800"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper components
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function CheckupCard({
  month,
  day,
  title,
  desc1,
  desc2,
  icon,
  iconColor,
}: {
  month: string;
  day: string;
  title: string;
  desc1: string;
  desc2: string;
  icon: string;
  iconColor: string;
}) {
  return (
    <View style={styles.checkupCard}>
      <View style={styles.checkupDate}>
        <Text style={styles.checkupMonth}>{month}</Text>
        <Text style={styles.checkupDay}>{day}</Text>
      </View>
      <View style={styles.checkupContent}>
        <Text style={styles.checkupTitle}>{title}</Text>
        <Text style={styles.checkupDesc}>{desc1}</Text>
        <Text style={styles.checkupDesc}>{desc2}</Text>
      </View>
      <Ionicons name={icon as any} size={20} color={iconColor} />
    </View>
  );
}

function VaccineCard({
  title,
  date,
  icon,
  iconColor,
}: {
  title: string;
  date: string;
  icon: string;
  iconColor: string;
}) {
  return (
    <View style={styles.vaccineCard}>
      <Ionicons name={icon as any} size={24} color={iconColor} />
      <View style={styles.vaccineContent}>
        <Text style={styles.vaccineTitle}>{title}</Text>
        <Text style={styles.vaccineDate}>{date}</Text>
      </View>
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

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },

  infoCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#111' },

  checkupCard: {
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
  checkupDate: { width: 50, alignItems: 'center', marginRight: 12 },
  checkupMonth: { fontSize: 12, fontWeight: '600', color: '#6A1B9A' },
  checkupDay: { fontSize: 18, fontWeight: '700', color: '#6A1B9A' },
  checkupContent: { flex: 1 },
  checkupTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  checkupDesc: { fontSize: 13, color: '#555' },

  vaccineCard: {
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
  vaccineContent: { marginLeft: 12 },
  vaccineTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  vaccineDate: { fontSize: 13, color: '#555' },
});
