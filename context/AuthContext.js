import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Set loading to true by default
    const [userToken, setUserToken] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [authUser, setAuthUser] = useState(null); // Initialize as null

    // Handle register
    const register = async (name, email, password) => {

        console.log("Registering user:", { name, email, password });
        setLoading(true);
        try {

            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            const randomToken = Math.random().toString(36).substr(2, 10); // Generate a random string
            await AsyncStorage.setItem('token', randomToken);

            await AsyncStorage.setItem('isLoggedin', JSON.stringify(true));

            setUserToken(randomToken);
            await getUserdata(randomToken);

            setIsLoggedIn(true);

        } catch (error) {
            console.error('Error during registration', error);
            Alert.alert('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to get user data from the API using the token
    const getUserdata = async (token) => {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');

            if (name && email && password) {
                const userData = { name, email, password };
                setUserdata(userData); // Save user data in state
                await AsyncStorage.setItem('userdata', JSON.stringify(userData)); // Persist user data
                console.log('User data fetched from storage:', userData);
            } else {
                console.log('No user data found in storage.');
            }
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };
    // Check if the user is logged in when the app starts
    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('token');
    //             const loggedIn = await AsyncStorage.getItem('isLoggedin');

    //             if (token && JSON.parse(loggedIn)) {
    //                 setUserToken(token);
    //                 await getUserdata(token); // Fetch and set userdata
    //                 setAuthUser(token); // Set authUser once token is available
    //                 setIsLoggedIn(true);
    //             }
    //         } catch (e) {
    //             console.error('Failed to fetch auth status', e);
    //         }
    //         setLoading(false);
    //     };

    //     checkLoginStatus();
    // }, []);

    // Handle login
    const login = async (email, password) => {

        const savedUser = await AsyncStorage.getItem('userdata');

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);

            console.log("Logging in user:", parsedUser.email, parsedUser.password);


            if (parsedUser.email === email && parsedUser.password === password) {
                setUserToken(parsedUser.token);
                setAuthUser(parsedUser);
                setIsLoggedIn(true);
                setLoading(false);
                return;
            } else {
                Alert.alert('Invalid email or password');
                setLoading(false);
                return;
            }
        };
    }

    // // Handle logout
    // // TODO::Handle later 
    // const logout = async () => {
    // const token = await AsyncStorage.getItem('token');
    // try {
    //     if (token) {
    //         const response = await axios.post(`${APP_URL}/logout`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         // const user = response.data;
    //         console.log("Logout", response);

    //         // const { data, message, statusCode, token } = response.data;
    //         // const userData = response.data;
    //         // setUserdata(userData); // Save user data in state
    //         // await AsyncStorage.setItem('userdata', JSON.stringify(userData)); // Persist user data
    //         // console.log('userdata from the API', userData);
    //     }
    // } catch (error) {
    //     console.error('Error during logout', error);
    // }

    // setIsLoggedIn(false);
    // setUserToken(null);
    // setUserdata(null);
    // setAuthUser(null); // Clear authUser on logout
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('isLoggedin');
    // await AsyncStorage.removeItem('userdata');
    //   };

    return (
        // <AuthContext.Provider value={{ isLoggedIn, userdata, loading, userToken, login, register, logout, authUser }}>
        <AuthContext.Provider value={{ isLoggedIn, userdata, loading, userToken, register, login, authUser }}>
            {children}
        </AuthContext.Provider>
    );
};