import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Deals = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const deals = [
    { id: 1, name: 'Fresh Apples', price: '$4/kg', image: require('../../assets/Images/pexels-pixabay-209339.jpg') },
    { id: 2, name: 'Juicy Oranges', price: '$3/kg', image: require('../../assets/Images/pexels-delphine-hourlay-91322-691166.jpg') },
    { id: 3, name: 'Sweet Pineapple', price: '$5/kg', image: require('../../assets/Images/pexels-viktoria-slowikowska-5678094.jpg') },
    { id: 4, name: 'Ripe Mangoes', price: '$6/kg', image: require('../../assets/Images/item1.jpg') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Deals</Text>
      </View>

      {/* Deals Grid */}
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dealCard}>
            <Image source={item.image} style={styles.dealImage} resizeMode="cover" />
            <Text style={styles.dealName}>{item.name}</Text>
            <Text style={styles.dealPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Deals;

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    backgroundColor: theme.card,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  listContent: {
    padding: 10,
  },
  dealCard: {
    backgroundColor: theme.card,
    borderRadius: 8,
    shadowColor: theme.mode === 'dark' ? '#000' : '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    width: '45%',
  },
  dealImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  dealName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 8,
  },
  dealPrice: {
    fontSize: 14,
    color: theme.mode === 'dark' ? '#d1d5db' : '#4b5563',
  },
});

