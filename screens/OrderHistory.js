import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_BG = '#f5f5f5';
const PRIMARY_CARD = '#fff';
const PRIMARY_TEXT = '#22223b';
const PRIMARY_ACCENT = '#16a34a';
const SECONDARY_TEXT = '#666';

const OrderHistory = ({ navigation }) => {
  const styles = getStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const savedOrders = await AsyncStorage.getItem('orders');
        if (savedOrders) {
          console.log('Loaded orders:', savedOrders);
          setOrders(JSON.parse(savedOrders));
        }
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => {
    const orderTotal = item.items.reduce(
      (total, i) => total + parseFloat(i.price.slice(1)) * i.quantity,
      0
    ).toFixed(2);

    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderDate}>Order Date: {item.date}</Text>
        <FlatList
          data={item.items}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item: prod }) => (
            <View style={styles.productRow}>
              <Text style={styles.productName}>{prod.name}</Text>
              <Text style={styles.productQty}>x{prod.quantity}</Text>
              <Text style={styles.productPrice}>{prod.price}</Text>
            </View>
          )}
        />
        <Text style={styles.orderTotal}>Total: ${orderTotal}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Order History</Text>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders placed yet.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderHistory;

const getStyles = () => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PRIMARY_BG,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: PRIMARY_BG,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_ACCENT,
    marginBottom: 20,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: PRIMARY_CARD,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  orderDate: {
    fontSize: 14,
    color: SECONDARY_TEXT,
    marginBottom: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  productName: {
    fontSize: 15,
    color: PRIMARY_TEXT,
    flex: 1,
  },
  productQty: {
    fontSize: 15,
    color: PRIMARY_TEXT,
    marginLeft: 8,
  },
  productPrice: {
    fontSize: 15,
    color: PRIMARY_TEXT,
    marginLeft: 8,
  },
  orderTotal: {
    fontWeight: 'bold',
    color: PRIMARY_ACCENT,
    marginTop: 8,
    fontSize: 16,
    textAlign: 'right',
  },
  emptyText: {
    color: SECONDARY_TEXT,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
});