import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../../context/AuthContext';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('sbmarahapsh@gmail.com')
  const [password, setPassword] = useState('password')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { login } = React.useContext(AuthContext) // Use the AuthContext to access the login function

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    // if (email !== 'sbmarahpash@gmail.com' || password !== '12345678') {
    //   alert('Invalid email or password')
    //   return
    // }
    await login(email, password);
    // Simulate a delay (e.g., for API call)
    // alert('Login successful')
    // navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6b8e23"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#6c7c59"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9f99d', // Tailwind's bg-green-100
    alignItems: 'center',
    justifyContent: 'center',
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
  passwordContainer: {
    width: '100%',
    height: 48,
    borderColor: '#4ade80',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#16a34a', // Tailwind's bg-green-600
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#047857', // Tailwind's text-green-700
    fontSize: 14,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#4b5563', // Tailwind's text-gray-600
    fontSize: 14,
  },
  signupLink: {
    color: '#047857',
    fontSize: 14,
    fontWeight: '500',
  },
})

export default Login
