// screens/NetContextScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetContext } from '../context/NetContext';
import { NetProvider } from '../../context/Netcontext';

const NetProvider= () => {
  const { isConnected } = useContext(NetContext);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isConnected ? '✅ You are online' : '❌ No internet connection'}
      </Text>
    </View>
  );
};

export default NetProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 20,
    color: '#fff',
  },
});
