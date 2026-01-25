import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CheckSymptoms() {
  const [symptoms, setSymptoms] = useState('');
  const [riskLevel, setRiskLevel] = useState<'green' | 'yellow' | 'red' | null>(null);

  const analyzeSymptoms = () => {
    // Simulate AI analysis - replace with actual API call
    const risk = Math.random();
    if (risk > 0.7) setRiskLevel('red');
    else if (risk > 0.4) setRiskLevel('yellow');
    else setRiskLevel('green');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Text style={styles.welcomeText}>Check Symptoms</Text>
            <Ionicons name="heart-outline" size={28} color="#FFF" />
          </View>
          <Text style={styles.statusText}>
            Describe how you're feeling
          </Text>
        </View>

        {/* Symptom Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Symptom Input</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your symptoms in Tagalog, English, or Bicol..."
              placeholderTextColor="#999"
              value={symptoms}
              onChangeText={setSymptoms}
              multiline
              numberOfLines={6}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.voiceButton}>
                <Ionicons name="mic-outline" size={20} color="#6A1B9A" />
                <Text style={styles.voiceButtonText}>Voice Input</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={analyzeSymptoms}>
            <Text style={styles.primaryButtonText}>Analyze Symptoms</Text>
          </TouchableOpacity>
        </View>

        {/* AI Result */}
        {riskLevel && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Assessment Result</Text>

            {riskLevel === 'green' && (
              <View style={[styles.resultCard, { borderLeftColor: '#4CAF50' }]}>
                <Ionicons name="checkmark-circle-outline" size={40} color="#4CAF50" />
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>🟢 Safe</Text>
                  <Text style={styles.resultDesc}>
                    Your symptoms appear normal. Continue regular prenatal care.
                  </Text>
                </View>
              </View>
            )}

            {riskLevel === 'yellow' && (
              <View style={[styles.resultCard, { borderLeftColor: '#FF9800' }]}>
                <Ionicons name="alert-circle-outline" size={40} color="#FF9800" />
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>🟡 Monitor</Text>
                  <Text style={styles.resultDesc}>
                    Please monitor these symptoms. Contact your BHW if they worsen.
                  </Text>
                </View>
              </View>
            )}

            {riskLevel === 'red' && (
              <View style={styles.emergencyCard}>
                <Ionicons name="warning-outline" size={50} color="#fff" />
                <Text style={styles.emergencyTitle}>🔴 EMERGENCY</Text>
                <Text style={styles.emergencyDesc}>Immediate medical attention required!</Text>

                <TouchableOpacity style={styles.emergencyButton}>
                  <Ionicons name="call-outline" size={24} color="#fff" />
                  <Text style={styles.emergencyButtonText}>CALL AMBULANCE NOW</Text>
                </TouchableOpacity>

                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyInfoText}>
                    Your BHW has been notified automatically
                  </Text>
                  <Text style={styles.emergencyInfoText}>
                    Emergency: 911 | Local Hotline: 123-4567
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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

  inputContainer: { marginBottom: 16 },
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE1F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  voiceButtonText: { marginLeft: 6, color: '#6A1B9A', fontWeight: '600' },

  primaryButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  resultCard: {
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
  resultContent: { marginLeft: 12, flex: 1 },
  resultTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  resultDesc: { fontSize: 13, color: '#555', marginTop: 4 },

  emergencyCard: {
    backgroundColor: '#D32F2F',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  emergencyTitle: { fontSize: 18, fontWeight: '700', color: '#FFF', marginTop: 12 },
  emergencyDesc: { fontSize: 14, color: '#FFF', marginVertical: 8, textAlign: 'center' },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B71C1C',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  emergencyButtonText: { color: '#FFF', fontWeight: '600', marginLeft: 8 },

  emergencyInfo: { marginTop: 12 },
  emergencyInfoText: { color: '#FFF', fontSize: 12, textAlign: 'center' },
});
