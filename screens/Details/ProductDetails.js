import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';


const ProductDetails = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);
    const { theme } = useTheme();
    const styles = getStyles(theme);
    

    const [modalVisible, setModalVisible] = useState(false);


    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
        params: {
            asin: 'B07ZPKBL9V',
            country: 'US'
        },
        headers: {
            'x-rapidapi-key': 'f9f7b7d4ebmsh3854af2b5759d5fp1a6f5ajsnfd8765a548f9',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            setModalVisible(true);
            try {
                const response = await axios.request(options);
                console.log(response.data.data);
            } catch (error) {
                console.error(error);
            }
            setModalVisible(false);
        };
        fetchProductDetails();
    }, []);

    const handleAddToCart = () => {
        setModalVisible(true);
        setTimeout(() => {
            addToCart(product);
            setModalVisible(false);
            Alert.alert('Product added to cart!', `${product.title || product.name} has been added to your cart.`);
        }, 1500);
    };

    // Helper for image source
    const getImageSource = (item) => {
        if (item.image && typeof item.image === 'number') return item.image;
        if (item.image) return { uri: item.image };
        if (item.product_photo) return { uri: item.product_photo };
        if (item.images && Array.isArray(item.images) && item.images.length > 0) return { uri: item.images[0] };
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
                        <Text style={styles.modalText}>Adding to cart...</Text>
                    </View>
                </View>
            </Modal>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={getImageSource(product)} style={styles.productImage} />
                <Text style={styles.productName}>{product.title || product.name}</Text>
                <Text style={styles.productPrice}>{product.price?.raw || product.product_price || ''}</Text>
                <Text style={styles.productDesc}>{product.description || product.product_description || 'No description available.'}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ProductDetails;

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollContent: {
        alignItems: 'center',
        padding: 24,
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
    productImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginBottom: 24,
        backgroundColor: '#eee',
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 18,
        color: theme.primary,
        marginBottom: 16,
        textAlign: 'center',
    },
    productDesc: {
        fontSize: 15,
        color: theme.text,
        marginBottom: 24,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: theme.buttonBackground || theme.primary,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: theme.buttonText || '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});