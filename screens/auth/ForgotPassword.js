import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Select which contact details we should use to reset your password
      </Text>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="mail-outline" size={20} color="#10b981" style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Email</Text>
          <Text style={styles.optionSubtitle}>Send to your Email</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="call-outline" size={20} color="#10b981" style={styles.icon} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Phone Number</Text>
          <Text style={styles.optionSubtitle}>Send to your Phone Number</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ConfirmPass')}
        style={styles.continueButton}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  continueButton: {
    backgroundColor: '#10b981',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});