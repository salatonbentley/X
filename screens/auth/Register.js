import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { AuthContext } from '../../context/AuthContext' // Assuming you have an AuthContext for managing authentication state
import AppLoader from '../components/AppLoader'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('sbmarahapsh@gmail.com')
  const [fullName, setFullName] = useState('Salaton')
  const [password, setPassword] = useState('password')
  const [confirmpassword, setConfirmpassword] = useState('password')
  const { register } = React.useContext(AuthContext) // Use the AuthContext to access the register function

  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true); // Start loading
    try {
      // Validate inputs
      if (!email || !password || !fullName) {
        alert('Please fill in all fields');
        setLoading(false); // Stop loading
        return;
      }
      if (password !== confirmpassword) {
        alert('Password and Confirm Password do not match');
        setLoading(false); // Stop loading
        return;
      }

      // Simulate a delay (e.g., for API call)
      setTimeout(async () => {
        // Call the register function from AuthContext
        await register(fullName, email, password);

        alert('Registration successful');
        setLoading(false); // Stop loading

        // Navigate to Home or Login screen
        navigation.navigate('Home');
      }, 5000);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
      setLoading(false); // Stop loading
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* // <View style={styles.container}> */}
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#6b8e23"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6b8e23"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={[styles.input, styles.marginTop]}
        placeholder="Password"
        placeholderTextColor="#6b8e23"
        secureTextEntry
      />
      <TextInput
        value={confirmpassword}
        onChangeText={setConfirmpassword}
        style={[styles.input, styles.marginTop]}
        placeholder="Confirm Password"
        placeholderTextColor="#6b8e23"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.registerButton}
        disabled={loading} // Disable button when loading
        activeOpacity={loading ? 1 : 0.7} // Prevents button press when loading
      >
        {loading ? (
          <AppLoader />
        ) : (
          <Text style={styles.registerButtonText}>Register</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signInRow}>
        <Text style={styles.signInPrompt}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
      {/* // </View> */}
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f99d', // Tailwind's bg-green-100
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46', // Tailwind's text-green-800
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#4ade80', // Tailwind's border-green-400
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  marginTop: {
    marginTop: 16,
  },
  registerButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#16a34a', // Tailwind's bg-green-600
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  signInPrompt: {
    color: '#4b5563', // Tailwind's text-gray-600
    fontSize: 14,
  },
  signInLink: {
    color: '#047857', // Tailwind's text-green-700
    fontSize: 14,
    fontWeight: '500',
  },
})
