import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'


const CartCards = ({image, name, price, quantity, decrement ,increment, removal }) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.cartItem}>
            <Image source={image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{name}</Text>
                <Text style={styles.itemPrice}>{price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => decrement}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => increment}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removal}>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartCards

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