import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: '💳' },
  { id: 'mobile', name: 'Mobile Money', icon: '📱' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' }
];

const deliveryOptions = [
  { id: 'pickup', name: 'Pick Up', icon: '🏪', description: 'Collect from our store' },
  { id: 'delivery', name: 'Delivery', icon: '🚚', description: 'Delivered to your address' }
];

const Checkout = ({ route, navigation }) => {
  const { cartItems , clearCart } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, City');
 
  const productsTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
  const deliveryFee = selectedDelivery === 'delivery' ? 7 : 0;
  const totalAmount = (productsTotal + deliveryFee).toFixed(2);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (clearCart) clearCart(); // <-- Clear the cart in Cart.js and AsyncStorage
      Alert.alert('Order Placed', 'Your order has been placed successfully!');
      navigation.popToTop();
    }, 2000);
  };

  //   const handlePlaceOrder = async () => {
  //   setLoading(true);
  //   setTimeout(async () => {
  //     setLoading(false);
  //     await AsyncStorage.setItem('cart', JSON.stringify([]));
  //     Alert.alert('Order Placed', 'Your order has been placed successfully!');
  //     navigation.popToTop();
  //   }, 2000);
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Checkout</Text>

        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Items ({itemCount})</Text>
            <Text style={styles.summaryAmount}>${productsTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Options */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Delivery Method</Text>
          {deliveryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedDelivery === option.id && styles.selectedOptionCard,
              ]}
              onPress={() => setSelectedDelivery(option.id)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <View style={styles.optionTextContainer}>
                <Text style={[
                  styles.optionTitle,
                  selectedDelivery === option.id && styles.selectedOptionText
                ]}>
                  {option.name}
                </Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              {selectedDelivery === option.id && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}

          {selectedDelivery === 'delivery' && (
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Delivery Address</Text>
              <Text style={styles.addressText}>{deliveryAddress}</Text>
              <TouchableOpacity style={styles.changeAddressButton}>
                <Text style={styles.changeAddressText}>Change Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Payment Methods */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  selectedPayment === method.id && styles.selectedPaymentOption,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={[
                  styles.paymentText,
                  selectedPayment === method.id && styles.selectedPaymentText
                ]}>
                  {method.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Total */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${productsTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${totalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order - ${totalAmount}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const getStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: theme.cardBackground || '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sumaryText: {
    fontSize: 16,
    color: theme.textSecondary || '#666',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border || '#e0e0e0',
    marginBottom: 12,
    backgroundColor: theme.cardBackground || '#fff',
  },
  selectedOptionCard: {
    borderColor: theme.primary || '#16a34a',
    backgroundColor: theme.primaryLight || 'rgba(22, 163, 74, 0.1)',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  selectedOptionText: {
    color: theme.primary || '#16a34a',
  },
  optionDescription: {
    fontSize: 14,
    color: theme.textSecondary || '#666',
    marginTop: 4,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.primary || '#16a34a',
  },
  addressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.border || '#e0e0e0',
  },
  addressLabel: {
    fontSize: 14,
    color: theme.textSecondary || '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 8,
  },
  changeAddressButton: {
    alignSelf: 'flex-start',
  },
  changeAddressText: {
    color: theme.primary || '#16a34a',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border || '#e0e0e0',
    marginBottom: 12,
    backgroundColor: theme.cardBackground || '#fff',
  },
  selectedPaymentOption: {
    borderColor: theme.primary || '#16a34a',
    backgroundColor: theme.primaryLight || 'rgba(22, 163, 74, 0.1)',
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  paymentText: {
    fontSize: 15,
    color: theme.text,
  },
  selectedPaymentText: {
    color: theme.primary || '#16a34a',
    fontWeight: '600',
  },
  totalContainer: {
    backgroundColor: theme.cardBackground || '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: theme.textSecondary || '#666',
  },
  totalValue: {
    fontSize: 16,
    color: theme.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.border || '#e0e0e0',
    marginVertical: 12,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.border || '#e0e0e0',
    backgroundColor: theme.background,
  },
  placeOrderButton: {
    backgroundColor: theme.primary || '#16a34a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});