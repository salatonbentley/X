import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import BottomNavigation from './BottomNavigation';
import Deals from '../screens/deals/Deals';
import Cart from '../screens/cart/Cart';
import Account from '../screens/account/Account';
import Categories from '../screens/categories/Categories';
import CategoryDetails from '../screens/Details/CategoryDetails';
import ForgotPassword from '../screens/auth/ForgotPassword';
import CornfirmPass from '../screens/auth/CornfirmPass';
import { AuthContext } from '../context/AuthContext';
import ProductDetails from '../screens/Details/ProductDetails';
import NewProduct from '../screens/Details/NewProduct';
import Checkout from '../screens/checkout/Checkout';
import OrderHistory from '../screens/OrderHistory';
import Feedback from '../screens/account/Feedback';
import PaymentHistory from '../screens/account/PaymentHistory';
import Profile from '../screens/account/Profile';
import Notification from '../screens/account/Notification';
import PaymentMethods from '../screens/account/PaymentMethods';
import Addresses from '../screens/account/Addresses';
import HelpCenter from '../screens/account/HelpCenter';


const Stack = createStackNavigator();

const StackNavigator = () => {

  const { isLoggedIn } = React.useContext(AuthContext); // Use the AuthContext to access the authentication state

  return (

    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={BottomNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Deals" component={Deals} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryDetails" component={CategoryDetails} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name="CornfirmPass" component={CornfirmPass} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name="NewProduct" component={NewProduct} options={{ headerShown: false }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
            <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentHistory" component={PaymentHistory} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
            <Stack.Screen name="Addresses" component={Addresses} options={{ headerShown: false }} />
            <Stack.Screen name="HelpCenter" component={HelpCenter} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>

    </NavigationContainer>

  )

}
export default StackNavigator