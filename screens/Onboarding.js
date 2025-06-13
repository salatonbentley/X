import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Naturally Green</Text>
      <View>
        {/* <Image
          source={require('../../assets/Images/How-to-save-money-on-groceries.webp')}
          style={styles.image}
          resizeMode="contain"
        /> */}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#d9f99d', // Tailwind's bg-green-100
  },
  title: {
    fontWeight: '800',
    fontSize: 30,
    color: '#047857', // Tailwind's text-green-700
  },
  image: {
    width: 320, // Tailwind's w-80 (80 * 4)
    height: 320, // Tailwind's h-80
  },
  button: {
    backgroundColor: '#047857', // Tailwind's bg-green-700
    width: 160, // Tailwind's w-40
    height: 40, // Tailwind's h-10
    borderRadius: 9999, // Tailwind's rounded-full
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
})
