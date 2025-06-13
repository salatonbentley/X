import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  Alert,
  Image,
} from 'react-native';
import React, { useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MaterialIcons, Ionicons, Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  // Mock user data - replace with your actual user data
  const user = {
    name: 'lionel messi',
    email: 'messimagic@example.com',
    avatar: 'https://hips.hearstapps.com/hmg-prod/images/barcelonas-argentinian-leo-messi-celebrates-after-scoring-news-photo-1686171153.jpg?crop=1.00xw:0.912xh;0,0.0603xh&resize=980:*',
  };

  const settingsData = [
    {
      title: 'Preferences',
      data: [
        {
          id: '1',
          title: 'Dark Mode',
          icon: <MaterialIcons name="dark-mode" size={24} color={theme.icon} />,
          action: toggleTheme,
          rightComponent: (
            <Switch
              value={theme.dark}
              onValueChange={toggleTheme}
              thumbColor={theme.primary}
              trackColor={{ false: theme.secondaryText, true: theme.primary }}
            />
          ),
        },
        {
          id: '2',
          title: 'Notifications',
          icon: <Ionicons name="notifications-outline" size={24} color={theme.icon} />,
          action: () => navigation.navigate('Notification'),
        },
      ],
    },
    {
      title: 'Account',
      data: [
        // {
        //   id: '3',
        //   title: 'Profile',
        //   icon: <Feather name="user" size={24} color={theme.icon} />,
        //   action: () => navigation.navigate('Profile'),
        // },
        {
          id: '4',
          title: 'Addresses',
          icon: <Entypo name="address" size={24} color={theme.icon} />,
          action: () => navigation.navigate('Addresses'),
        },
        {
          id: '5',
          title: 'Payment Methods',
          icon: <FontAwesome name="credit-card" size={24} color={theme.icon} />,
          action: () => navigation.navigate('PaymentMethods'),
        },
      ],
    },
    {
      title: 'History',
      data: [
        {
          id: '6',
          title: 'Order History',
          icon: <MaterialIcons name="history" size={24} color={theme.icon} />,
          action: () => navigation.navigate('OrderHistory'),
        },
        {
          id: '7',
          title: 'Payment History',
          icon: <MaterialIcons name="payment" size={24} color={theme.icon} />,
          action: () => navigation.navigate('PaymentHistory'),
        },
      ],
    },
    {
      title: 'Support',
      data: [
        {
          id: '8',
          title: 'Feedback',
          icon: <MaterialIcons name="feedback" size={24} color={theme.icon} />,
          action: () => navigation.navigate('Feedback'),
        },
        {
          id: '9',
          title: 'Help Center',
          icon: <Ionicons name="help-circle-outline" size={24} color={theme.icon} />,
          action: () => navigation.navigate('HelpCenter'),
        },
      ],
    },
    {
      title: 'System',
      data: [
        {
          id: '10',
          title: 'Log Out',
          icon: <Ionicons name="exit" size={24} color={theme.icon} />,
        },
        {
          id: '11',
          title: 'Log Out',
          icon: <MaterialIcons name="logout" size={24} color={theme.error} />,
          action: () => handleLogout(),
        },
      ],
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'AuthStack' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={item.action}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      {item.rightComponent || (
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.secondaryText} />
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <TouchableOpacity 
          style={styles.profileHeader} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={{ uri: user.avatar }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <MaterialIcons 
            name="keyboard-arrow-right" 
            size={24} 
            color={theme.secondaryText} 
          />
        </TouchableOpacity>

        <SectionList
          sections={settingsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    // Profile Header Styles
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      margin: 16,
      marginBottom: 8,
      backgroundColor: theme.card,
      borderRadius: 12,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    profileEmail: {
      fontSize: 14,
      color: theme.secondaryText,
      marginTop: 4,
    },
    // Existing styles
    listContent: {
      paddingHorizontal: 16,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.secondaryText,
      marginTop: 24,
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 12,
      backgroundColor: theme.card,
      borderRadius: 12,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 8,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 4,
    },
    sectionSeparator: {
      height: 12,
    },
  });

export default Settings;