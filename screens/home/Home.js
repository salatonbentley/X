import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../../context/CartContext'; // adjust path accordingly
import { useTheme } from '../../context/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';

const Home = ({ navigation }) => {
  const { cartItemCount, addToCart } = React.useContext(CartContext);
  // const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const categories = [
    { id: 1, name: 'Vegetables', icon: 'https://img.icons8.com/color/48/vegetarian-food.png' },
    { id: 2, name: 'Fruits', icon: 'https://img.icons8.com/color/48/cherry.png' },
    { id: 3, name: 'Milk & Eggs', icon: 'https://img.icons8.com/color/48/milk-bottle.png' },
    { id: 4, name: 'Drinks', icon: 'https://img.icons8.com/color/48/cocktail.png' },
  ];

  const products = [
    { id: 1, name: 'Apple', price: '$4/kg', image: require('../../assets/Images/pexels-pixabay-209339.jpg') },
    { id: 2, name: 'Orange', price: '$3/kg', image: require('../../assets/Images/pexels-delphine-hourlay-91322-691166.jpg') },
    { id: 3, name: 'Pineapple', price: '$5/kg', image: require('../../assets/Images/pexels-viktoria-slowikowska-5678094.jpg') },
    { id: 4, name: 'Dark Grapes', price: '$5/kg', image: require('../../assets/Images/pexels-qjpioneer-708777.jpg') },
    { id: 5, name: 'Green Grapes', price: '$5/kg', image: require('../../assets/Images/pexels-pixabay-60021.jpg') },
    { id: 6, name: 'Red Grapes', price: '$5/kg', image: require('../../assets/Images/pexels-brunoscramgnon-23042.jpg') },
    { id: 7, name: 'Kiwi', price: '$5/kg', image: require('../../assets/Images/pexels-magda-ehlers-pexels-1557276.jpg') },
    { id: 8, name: 'Tomato', price: '$5/kg', image: require('../../assets/Images/pexels-pixabay-373019.jpg') },
    { id: 9, name: 'Lime', price: '$5/kg', image: require('../../assets/Images/pexels-cup-of-couple-7657210.jpg') },
    { id: 10, name: 'Pineapple', price: '$5/kg', image: require('../../assets/Images/pexels-viktoria-slowikowska-5678094.jpg') },
  ];

  // const handleAddToCart = (product) => {
  //   setModalVisible(true); // Show the modal
  //   setTimeout(() => {
  //     addToCart(product);
  //     setModalVisible(false); // Hide the modal
  //     Alert.alert('Product added to cart!', `${product.name} has been added to your cart.`);
  //   }, 2000);
  // };

  const handleAddToCart = (product) => {
    setModalVisible(true); // Show the modal
    setTimeout(() => {
      addToCart(product); // Add product to cart
      setModalVisible(false); // Hide the modal
      console.log('Product added to cart:', product);
      Alert.alert('Product added to cart!', `${product.name} has been added to your cart.`);
      fetchCartCount(); // Update cart count after adding item
    }, 2000);
  };


  const fetchCartCount = async () => {
    try {
      const savedCart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const totalCount = savedCart.reduce((count, item) => count + item.quantity, 0);
      setCartItemCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Modal with Loader */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.modalText}>Processing...</Text>
          </View>
        </View>
      </Modal>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search food, drink, etc"
          placeholderTextColor="#6b8e23"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/search.png' }}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryIconContainer}>
                  <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Deals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Deals')}>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.dealCard}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/96/shopping-cart.png' }}
              style={styles.dealImage}
            />
            <View style={styles.dealTextContainer}>
              <Text style={styles.dealTitle}>50% OFF</Text>
              <Text style={styles.dealSubtitle}>On Grocery Combo packs</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Deals')}
                style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Items */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular items</Text>
          </View>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
             <ItemCard
                image={item.image}
                name={item.name}
                price={item.price}
                onPress={() => handleAddToCart(item)}
             
                addButtonText="Add to cart"
                style={styles.productCard}
                imageStyle={styles.productImage}
                nameStyle={styles.productName}
                priceStyle={styles.productPrice}
             />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background || '#f3f4f6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.text,
  },
  searchBar: {
    backgroundColor: theme.primary || '#16a34a',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.inputBackground || '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: theme.text || '#374151',
  },
  iconButton: {
    marginLeft: 12,
    backgroundColor: theme.background || '#15803d',
    padding: 12,
    borderRadius: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text || '#1f2937',
  },
  link: {
    color: theme.link || '#16a34a',
    fontSize: 14,
  },
  horizontalScroll: {
    marginTop: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconContainer: {
    backgroundColor: theme.categoryBackground || '#dcfce7',
    padding: 12,
    borderRadius: 50,
  },
  categoryIcon: {
    width: 48,
    height: 48,
  },
  categoryText: {
    fontSize: 14,
    color: theme.text || '#374151',
    marginTop: 4,
  },
  dealCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  dealImage: {
    width: 64,
    height: 64,
  },
  dealTextContainer: {
    marginLeft: 16,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  dealSubtitle: {
    fontSize: 14,
    color: theme.text || '#6b7280',
  },
  orderButton: {
    marginTop: 8,
    backgroundColor: theme.button || '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderButtonText: {
    color: theme.text || '#fff',
    fontSize: 14,
  },
  flatListContent: {
    marginTop: 8,
  },
  productCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 160,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: theme.text || '#6b7280',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: theme.background || '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addButtonText: {
    color: theme.buttonText || '#fff',
    fontSize: 14,
  },
});
