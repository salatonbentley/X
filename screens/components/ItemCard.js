import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const ItemCard = ({ image, name, price, onPress }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.productCard}>
      <Image source={image} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItemCard


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
    backgroundColor: theme.buttonBackground || '#15803d',
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
    backgroundColor: theme.cardBackground,
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
    color: theme.subText || '#6b7280',
  },
  orderButton: {
    marginTop: 8,
    backgroundColor: theme.buttonBackground || '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderButtonText: {
    color: theme.buttonText || '#fff',
    fontSize: 14,
  },
  flatListContent: {
    marginTop: 8,
  },
  productCard: {
    backgroundColor: theme.cardBackground,
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
    color: theme.subText || '#6b7280',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: theme.buttonBackground || '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addButtonText: {
    color: theme.buttonText || '#fff',
    fontSize: 14,
  },
});