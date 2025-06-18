// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const Netcontext = () => {
//   const [isConnected, setIsConnected] = useState(true);
//   const [showBanner, setShowBanner] = useState(false);
//   const slideAnim = new Animated.Value(-50); // Start off-screen

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       const newStatus = state.isConnected;
//       setIsConnected(newStatus);
      
//       if (newStatus) {
//         // Online - show temporarily
//         setShowBanner(true);
//         slideIn();
//         const timer = setTimeout(() => {
//           slideOut();
//         }, 4000);
//         return () => clearTimeout(timer);
//       } else {
//         // Offline - show persistently
//         setShowBanner(true);
//         slideIn();
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const slideIn = () => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const slideOut = () => {
//     Animated.timing(slideAnim, {
//       toValue: -50,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowBanner(false));
//   };

//   if (!showBanner) return null;

//   return (
//     <Animated.View 
//       style={[
//         styles.banner,
//         { 
//           backgroundColor: isConnected ? '#4CAF50' : '#F44336',
//           transform: [{ translateY: slideAnim }]
//         }
//       ]}
//     >
//       <Text style={styles.bannerText}>
//         {isConnected ? 'You are back online' : 'No internet connection'}
//       </Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   banner: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 50,
//     zIndex: 1000,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bannerText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Netcontext;


// context/NetContext.js
import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetContext = createContext();

export const NetProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetContext.Provider value={{ isConnected }}>
      {children}
    </NetContext.Provider>
  );
};
