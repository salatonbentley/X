import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/home/Home';
import Deals from '../screens/deals/Deals';
import Categories from '../screens/categories/Categories';
import Cart from '../screens/cart/Cart';
import Account from '../screens/account/Account';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
    const { theme } = useTheme();
    const { cartItemCount } = useContext(CartContext);

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                tabBarStyle: {
                    backgroundColor: theme.card,
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                headerShown: false,
            })
        }>
            <Tab.Screen name="Landing" component={Home} options={{
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="home" size={26} color={focused ? "green" : "black"} />
                ),
            }} />
            <Tab.Screen name="Deals" component={Deals} options={{
                headerShown: false,
                tabBarLabel: "Deals",
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="save" size={26} color={focused ? "green" : "black"} />),
            }} />
            <Tab.Screen name="Categories" component={Categories} options={{
                headerShown: false,
                tabBarLabel: "Categories",
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="menu-book" size={26} color={focused ? "green" : "black"} />),
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                headerShown: false,
                tabBarLabel: "Cart",
                tabBarIcon: ({ focused, color, size }) => (
                    <React.Fragment>
                        <Icon name="shopping-cart" size={26} color={focused ? "green" : "black"} />
                        {true && ( // Replace `true` with a condition to show the badge
                            <View style={{
                                position: 'absolute',
                                right: -6,
                                top: -3,
                                backgroundColor: 'red',
                                borderRadius: 6,
                                width: 12,
                                height: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: 'white', fontSize: 8, fontWeight: 'bold' }}>{cartItemCount > 0 ? cartItemCount : 0}</Text> {/* Replace `3` with the badge number */}
                            </View>
                        )}
                    </React.Fragment>
                ),
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                headerShown: false,
                tabBarLabel: "Account",
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon name="settings" size={26} color={focused ? "green" : "black"} />),
            }} />
        </Tab.Navigator>
    );
}

export default BottomNavigation



