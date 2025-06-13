import { StyleSheet, Text, View, ScrollView, Button, Image, TextInput, Platform } from 'react-native'
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerComponent from '../components/DateTimePicker';

// import { supabase } from '../../supabase';

const NewProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    useEffect(() => {
        console.log(image);
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission is required to access media library');
                }
            }
        })();
    }, []);




    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleNewProduct = async () => {
        if (!name || !price || !description || !image) {
            alert('Please fill in all fields and select an image');
            return;
        }
        // try {
        //     const { error } = await supabase.from('products').insert([
        //         {
        //             name: name,
        //             price: parseFloat(price),
        //             description: description,
        //             // image: image
        //         }
        //     ]);
        //     if (error) throw error;
        //      alert('Product added successfully!');

        // } catch (error) {
        //     alert('Error adding product: ' + error.message);

        // }

        // Here you would typically send the data to your backend or API
        console.log('New Product:', { name, price, description, image });
        alert('Product added successfully!');

        // Reset form fields
        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Product</Text>
            </View>

            <View>

                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 5
                    }}
                />
                <TextInput
                    placeholder='Price'
                    value={price}
                    onChangeText={setPrice}
                    keyboardType='numeric'
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 5
                    }}
                />
                <TextInput
                    placeholder='Product description '
                    value={description}
                    onChangeText={setDescription}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 5
                    }}
                />
                {/* <View>
                    <TouchableOpacity

                        onPress={() => showMode('date')}>
                        <Text
                            style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}

                        >Select Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showMode('time')}
                        style={{ marginBottom: 20 }}>
                        <Text
                            style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                            Select Time
                        </Text>
                    </TouchableOpacity>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View> */}
                <View>
                    <DateTimePickerComponent/>
                </View>



                {/* <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Selected Date: {date.toLocaleDateString()}</Text>

                </View> */}



                <View style={{
                    marginBottom: 30,
                    marginTop: 10,
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#888',
                    borderRadius: 10,
                    padding: 10
                }}>
                    <TouchableOpacity
                        //   style={{
                        //     backgroundColor: '#28a745',
                        //     padding: 15,
                        //     borderRadius: 5,
                        //     alignItems: 'center'
                        // }}
                        onPress={pickImage}>
                        <Text
                            style={{ fontSize: 16, fontWeight: 'bold' }}
                        >Add Image</Text>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 220, height: 220, marginTop: 15, borderRadius: 10 }}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#28a745',
                        padding: 15,
                        borderRadius: 5,
                        alignItems: 'center'
                    }}
                    onPress={() => handleNewProduct()}>
                    <Text
                        style={{ fontSize: 16, fontWeight: 'bold' }}
                    >ADD PRODUCT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default NewProduct

const styles = StyleSheet.create({})