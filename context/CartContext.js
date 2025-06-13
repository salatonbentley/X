// context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // const fetchCartCount = async () => {
  //   try {
  //     const savedCart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
  //     const totalCount = savedCart.reduce((count, item) => count + item.quantity, 0);
  //     setCartItemCount(totalCount);
  //   } catch (error) {
  //     console.error('Error fetching cart count:', error);
  //   }
  // };
  const fetchCartCount = async () => {
  try {
    const savedCart = await AsyncStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    setCartItemCount(cart.length);
  } catch (error) {
    console.error('Error fetching cart count:', error);
  }
};

  useEffect(() => {
    fetchCartCount();
  }, []);

  const addToCart = async (product) => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const index = cart.findIndex(item => item.id === product.id);

      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      fetchCartCount();
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      const cartItems = JSON.parse(await AsyncStorage.getItem('cart')) || [];

      if (cartItems.length === 0) {
        Alert.alert('Cart is empty!');
        return;
      }

      const newOrder = {
        id: Date.now().toString(),
        items: cartItems,
        date: new Date().toISOString(),
      };

      const storedOrders = await AsyncStorage.getItem('orders');
      const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];

      const updatedOrders = [...parsedOrders, newOrder];
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

      await AsyncStorage.removeItem('cart');
      setCartItemCount(0);

      Alert.alert('Order Placed Successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Failed to place order');
    }
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart, fetchCartCount, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
