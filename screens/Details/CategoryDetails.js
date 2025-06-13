import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CartContext } from '../../context/CartContext';
import ItemCard from '../components/ItemCard';
import axios from 'axios';

const CategoryDetails = ({ route ,navigation }) => {
  const category = route.params.category;
  const { addToCart } = useContext(CartContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  // const options = {
  //   method: 'GET',
  //   url: 'https://real-time-amazon-data.p.rapidapi.com/products-by-category',
  //   params: {
  //     category_id: '281407',
  //     page: '1',
  //     country: 'US',
  //     sort_by: 'RELEVANCE',
  //     product_condition: 'ALL',
  //     is_prime: 'false',
  //     deals_and_discounts: 'NONE'
  //   },
  //   headers: {
  //     'x-rapidapi-key': 'f9f7b7d4ebmsh3854af2b5759d5fp1a6f5ajsnfd8765a548f9',
  //     'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
  //   }
  // };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.request(options);
  //       // Log the products
  //       console.log('Fetched products:', response.data.data.products);
  //       setTimeout(() => {
  //         setProducts(response.data.data.products);
  //         setLoading(false);
  //       }, 1000);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error(error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);



  const handleAddToCart = (product) => {
    setModalVisible(true);
    setTimeout(() => {
      addToCart(product);
      setModalVisible(false);
      Alert.alert('Product added to cart!', `${product.title || product.name} has been added to your cart.`);
    }, 2000);
  };

  // Helper to handle both local and remote images
  const getImageSource = (item) => {
    if (item.image && typeof item.image === 'number') {
      return item.image; // local require
    }
    if (item.image) {
      return { uri: item.image };
    }
    if (item.product_photo) {
      return { uri: item.product_photo };
    }
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return { uri: item.images[0] };
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Modal Loader */}
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

      <Text style={styles.headerText}>Category: {category.name}</Text>

      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, idx) => (item.id ? item.id.toString() : idx.toString())}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('ProductDetails', { product: item });
              }}>
            <ItemCard
              image={(item)}
              name={item.product_title || item.name}
              price={item.product_price}
              onPress={() => handleAddToCart(item)}
              addButtonText="Add to cart"
              style={styles.productCard}
              imageStyle={styles.productImage}
              nameStyle={styles.productName}
              priceStyle={styles.productPrice}
            />
            
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default CategoryDetails;

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  gridContent: {
    marginTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});