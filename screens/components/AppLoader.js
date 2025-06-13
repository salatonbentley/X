import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppLoader = () => {
  return (
    <ActivityIndicator color={'#096B68'} size={'large'} style={{ flex: 1 }} />
  )
}

export default AppLoader