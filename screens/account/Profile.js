import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { MaterialIcons, Feather } from '@expo/vector-icons';
// import { useTheme } from '../../context/ThemeContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Profile = ({ navigation }) => {
//   const { theme } = useTheme();
//   const styles = getStyles(theme);
  
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     avatar: null,
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         // Load user data from AsyncStorage or your backend
//         const storedUser = await AsyncStorage.getItem('userProfile');
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           // Default user data if none exists
//           setUser({
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             phone: '+1 234 567 890',
//             avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//           });
//         }
//       } catch (error) {
//         console.error('Failed to load user data', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadUserData();
//   }, []);

//   const handleChangeAvatar = async () => {
//     // Request camera roll permissions
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission required', 'We need access to your photos to change your profile picture');
//       return;
//     }

//     // Launch image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });

//     if (!result.canceled) {
//       setUser({ ...user, avatar: result.assets[0].uri });
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setUser({ ...user, [field]: value });
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       // Save to AsyncStorage or your backend
//       await AsyncStorage.setItem('userProfile', JSON.stringify(user));
//       setIsEditing(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save profile');
//       console.error('Failed to save profile', error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color={theme.primary} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color={theme.text} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Profile</Text>
//           {isEditing ? (
//             <TouchableOpacity onPress={handleSave} disabled={isSaving}>
//               {isSaving ? (
//                 <ActivityIndicator size="small" color={theme.primary} />
//               ) : (
//                 <Text style={styles.saveButton}>Save</Text>
//               )}
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={() => setIsEditing(true)}>
//               <Text style={styles.editButton}>Edit</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.profileSection}>
//           <TouchableOpacity 
//             onPress={isEditing ? handleChangeAvatar : null}
//             style={styles.avatarContainer}
//           >
//             <Image
//               source={user.avatar ? { uri: user.avatar } : require('../../assets/default-avatar.png')}
//               style={styles.avatar}
//             />
//             {isEditing && (
//               <View style={styles.cameraIcon}>
//                 <Feather name="camera" size={20} color={theme.text} />
//               </View>
//             )}
//           </TouchableOpacity>

//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Full Name</Text>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.input}
//                   value={user.name}
//                   onChangeText={(text) => handleInputChange('name', text)}
//                   placeholder="Enter your name"
//                   placeholderTextColor={theme.secondaryText}
//                 />
//               ) : (
//                 <Text style={styles.textValue}>{user.name}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Email</Text>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.input}
//                   value={user.email}
//                   onChangeText={(text) => handleInputChange('email', text)}
//                   keyboardType="email-address"
//                   placeholder="Enter your email"
//                   placeholderTextColor={theme.secondaryText}
//                 />
//               ) : (
//                 <Text style={styles.textValue}>{user.email}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Phone Number</Text>
//               {isEditing ? (
//                 <TextInput
//                   style={styles.input}
//                   value={user.phone}
//                   onChangeText={(text) => handleInputChange('phone', text)}
//                   keyboardType="phone-pad"
//                   placeholder="Enter your phone number"
//                   placeholderTextColor={theme.secondaryText}
//                 />
//               ) : (
//                 <Text style={styles.textValue}>{user.phone}</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {!isEditing && (
//           <View style={styles.actionsContainer}>
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => navigation.navigate('ChangePassword')}
//             >
//               <Text style={styles.actionButtonText}>Change Password</Text>
//               <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.secondaryText} />
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const getStyles = (theme) => StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.background,
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.border,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: theme.text,
//   },
//   editButton: {
//     color: theme.primary,
//     fontSize: 16,
//   },
//   saveButton: {
//     color: theme.primary,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   profileSection: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: theme.primary,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     right: 10,
//     bottom: 10,
//     backgroundColor: theme.primary,
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     width: '100%',
//     paddingHorizontal: 16,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: theme.secondaryText,
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: theme.card,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: theme.text,
//     borderWidth: 1,
//     borderColor: theme.border,
//   },
//   textValue: {
//     fontSize: 16,
//     color: theme.text,
//     paddingVertical: 12,
//   },
//   actionsContainer: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: theme.border,
//   },
//   actionButtonText: {
//     fontSize: 16,
//     color: theme.text,
//   },
// });

// export default Profile;