import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { CartContext } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import AppLoader from '../components/AppLoader';
import CartCards from '../components/CartCards';

const Cart = ({ navigation }) => {
  const { fetchCartCount } = useContext(CartContext);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);



  // const placeOrder = () => {
  //   if (cartItems.length === 0) {
  //     Alert.alert('Cart is empty!');
  //     return;
  //   }

  //   // Save current cart as an order
  //   setOrders((prevOrders) => [...prevOrders, { id: Date.now().toString(), items: cartItems }]);

  //   // Clear the cart (simulate refresh)
  //   setCartItems([]);

  //   Alert.alert('Order Placed Successfully!');
  // };



  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      Alert.alert('Error', 'Failed to load cart items.');
    } finally {
      setLoading(false);
    }
  }


  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const handleRemoveItem = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    fetchCartCount();
  };

  const handleIncreaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    fetchCartCount();
  };

  const handleDecreaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    fetchCartCount();
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  ).toFixed(2);

  const renderItem = ({ item }) => (

    <CartCards
      image={item.image}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      decrement={() => handleDecreaseQuantity(item.id)}
      increment={() => handleIncreaseQuantity(item.id)}
      removal={() => handleRemoveItem(item.id)} />
  );

  const renderFooter = () => (
    <View style={styles.checkoutSection}>
      <Text style={styles.totalText}>Total: ${totalAmount}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Checkout', {
          cartItems, clearCart: () => {

            
            AsyncStorage.getItem('orders').then((orders) => {
              let ordersArr = [];
              if (orders) {
                ordersArr = JSON.parse(orders);
              }
              ordersArr.push({ id: Date.now().toString(), items: cartItems });
              AsyncStorage.setItem('orders', JSON.stringify(ordersArr));
            });


            setCartItems([]);
            AsyncStorage.setItem('cart', JSON.stringify([]));
            fetchCartCount();
          }
        })}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <AppLoader />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Cart</Text>
        </View>

        {/* Cart List + Checkout Footer */}
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>

  );
};

export default Cart;

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
      bottom: 40,
      top: 10,
    },
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
      padding: 16,
      paddingBottom: 40, // Additional space for better UX
    },
    cartItem: {
      backgroundColor: theme.card,
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemImage: {
      width: 64,
      height: 64,
      borderRadius: 8,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 16,
    },
    itemName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
    },
    itemPrice: {
      fontSize: 14,
      color: theme.text,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    quantityButton: {
      backgroundColor: theme.buttonBackground,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    quantityText: {
      color: theme.buttonText,
    },
    quantityValue: {
      marginHorizontal: 8,
      color: theme.text,
    },
    removeText: {
      color: theme.error,
      fontWeight: 'bold',
    },
    checkoutSection: {
      top: 5,
      bottom: 40,
      backgroundColor: theme.card,
      padding: 8,
      marginBottom: 24,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    checkoutButton: {
      backgroundColor: theme.buttonBackground || theme.primary || '#16a34a',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    checkoutButtonText: {
      color: theme.buttonText || '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
