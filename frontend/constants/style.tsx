import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3E5F5' 
  },
  scrollContent: { 
    padding: 20 
  },
  
  // Auth Screens
  authContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  appName: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#6A1B9A', 
    marginTop: 10 
  },
  tagline: { 
    fontSize: 16, 
    color: '#7B1FA2', 
    marginTop: 5 
  },
  formContainer: { 
    backgroundColor: '#fff', 
    padding: 25, 
    borderRadius: 20, 
    elevation: 5 
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#4A148C', 
    marginBottom: 8, 
    marginTop: 15 
  },
  input: { 
    backgroundColor: '#F3E5F5', 
    padding: 15, 
    borderRadius: 12, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#E1BEE7' 
  },
  primaryButton: { 
    backgroundColor: '#6A1B9A', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 25,
    elevation: 3
  },
  primaryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  linkText: { 
    color: '#7B1FA2', 
    textAlign: 'center', 
    marginTop: 15, 
    fontSize: 14 
  },

  // Header Card
  headerCard: { 
    backgroundColor: '#6A1B9A', 
    padding: 25, 
    borderRadius: 24, 
    marginBottom: 25, 
    elevation: 8, 
    shadowColor: '#4A148C', 
    shadowOpacity: 0.3, 
    shadowRadius: 10 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  welcomeText: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  statusText: { 
    color: '#E1BEE7', 
    marginTop: 5, 
    fontSize: 16 
  },
  progressBar: { 
    height: 10, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 5, 
    marginTop: 20 
  },
  progressFill: { 
    height: 10, 
    backgroundColor: '#EA80FC', 
    borderRadius: 5 
  },

  // Sections
  section: { 
    marginBottom: 25 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4A148C', 
    marginBottom: 15 
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },

  // Grid Cards
  grid: { 
    flexDirection: 'row', 
    gap: 15 
  },
  gridCard: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 20, 
    elevation: 3, 
    borderBottomWidth: 3, 
    borderBottomColor: '#E1BEE7' 
  },
  iconBox: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  cardLabel: { 
    fontSize: 12, 
    color: '#999' 
  },
  cardValue: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#4A148C' 
  },

  // Alert Cards
  alertCard: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 12, 
    borderLeftWidth: 5, 
    borderLeftColor: '#7B1FA2',
    elevation: 2
  },
  alertTextContent: { 
    flex: 1 
  },
  alertTitle: { 
    fontWeight: 'bold', 
    color: '#4A148C',
    fontSize: 15
  },
  alertDesc: { 
    fontSize: 13, 
    color: '#777',
    marginTop: 4
  },
  alertTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4
  },

  // Symptom Check
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    elevation: 2,
    marginBottom: 15
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#333'
  },
  buttonRow: {
    marginTop: 10,
    alignItems: 'flex-end'
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1BEE7'
  },
  voiceButtonText: {
    color: '#6A1B9A',
    fontWeight: '600',
    fontSize: 14
  },

  // Result Cards
  resultCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 15,
    borderLeftWidth: 5,
    elevation: 3
  },
  resultContent: {
    flex: 1
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8
  },
  resultDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },

  // Emergency Card
  emergencyCard: {
    backgroundColor: '#D32F2F',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8
  },
  emergencyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15
  },
  emergencyDesc: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center'
  },
  emergencyButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center'
  },
  emergencyButtonText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emergencyInfo: {
    marginTop: 20,
    alignItems: 'center',
    gap: 5
  },
  emergencyInfoText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9
  },

  // Pink Card
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E5F5'
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500'
  },
  infoValue: {
    fontSize: 14,
    color: '#4A148C',
    fontWeight: '600'
  },

  // Checkup Cards
  checkupCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center'
  },
  checkupDate: {
    backgroundColor: '#6A1B9A',
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkupMonth: {
    color: '#E1BEE7',
    fontSize: 12,
    fontWeight: '600'
  },
  checkupDay: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  checkupContent: {
    flex: 1
  },
  checkupTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 4
  },
  checkupDesc: {
    fontSize: 12,
    color: '#777',
    marginTop: 2
  },

  // Vaccine Cards
  vaccineCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center'
  },
  vaccineContent: {
    flex: 1
  },
  vaccineTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A148C'
  },
  vaccineDate: {
    fontSize: 13,
    color: '#777',
    marginTop: 4
  }
});