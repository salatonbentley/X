import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Categories = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const [modalVisible, setModalVisible] = useState(false);

    const categories = [
        { id: 1, name: 'Vegetables', icon: 'https://img.icons8.com/color/96/vegetarian-food.png' },
        { id: 2, name: 'Fruits', icon: 'https://img.icons8.com/color/96/cherry.png' },
        { id: 3, name: 'Milk & Eggs', icon: 'https://img.icons8.com/color/96/milk-bottle.png' },
        { id: 4, name: 'Drinks', icon: 'https://img.icons8.com/color/96/cocktail.png' },
        { id: 5, name: 'Cakes', icon: 'https://img.icons8.com/color/96/birthday-cake.png' },
        { id: 7, name: 'Bakery', icon: 'https://img.icons8.com/color/96/bread.png' },
        { id: 9, name: 'Grain', icon: 'https://img.icons8.com/color/96/rice-bowl.png' },
        { id: 11, name: 'Biscuit', icon: 'https://img.icons8.com/color/96/cookie.png' },
    ];



    return (
        <View style={styles.container}>
            {/* Modal for loading */}
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
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Categories</Text>
            </View>

            {/* Categories Grid */}
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.gridContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                            setTimeout(() => {
                                setModalVisible(false);
                                navigation.navigate('CategoryDetails', { category: item });
                            }, 1000);
                        }}
                        style={styles.categoryCard}
                    >
                        <Image source={{ uri: item.icon }} style={styles.categoryImage} />
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Categories;

const getStyles = (theme) => StyleSheet.create({

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
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        backgroundColor: theme.card,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
    },
    gridContent: {
        padding: 10,
    },
    categoryCard: {
        backgroundColor: theme.card,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        margin: 8,
        width: '28%',
    },
    categoryImage: {
        width: 64,
        height: 64,
    },
    categoryName: {
        fontSize: 14,
        color: theme.text,
        marginTop: 8,
        textAlign: 'center',
    },
});
