import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const DummyFormData = () => {
    const [name, setName] = useState('qwerty');
    const [opening, setOpening] = useState(new Date());
    const [closing, setClosing] = useState(new Date());
    const [showOpening, setShowOpening] = useState(false);
    const [showClosing, setShowClosing] = useState(false);
    const [phone, setPhone] = useState('1200987654321');
    const [contact, setContact] = useState('fff fgfgf');
    const [image, setImage] = useState(null);

    // Image picker
    const pickImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'Please allow access to your photos.');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleFormSubmit = async () => {
        if (!name || !phone || !contact) {
            Alert.alert('Error', 'Please fill in all fields and select an image.');
            return;
        }
        
        try {
            // const token = await AsyncStorage.getItem('token');
            const token = "50|prnnpht8hKN5qZU905AMhDCHOv7vn26F0P7t5QgWb825cb8a";
            const formUrl = 'http://192.168.1.15:8000/api/outletsStore'; 
            const formData = new FormData();
            formData.append('name', name);
            formData.append('opening_time', opening.toISOString());
            formData.append('closing_time', closing.toISOString());
            formData.append('phone_number', phone);
            formData.append('contact_person', contact);
            if (image) {
                const imageName = image.split('/').pop();
                formData.append('image', {
                    uri: image,
                    type: 'image/jpeg', // or the appropriate type of your image
                    name: imageName,
                });
            }
            formData.append('location', 'Namanga');

            console.log('Submitting form with data:', formData);

            const response = await axios.post(formUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully:', response.data);

        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter name here"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Opening Hours:</Text>
            <TouchableOpacity onPress={() => setShowOpening(true)} style={styles.pickerButton}>
                <Text style={styles.pickerText}>{opening.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showOpening && (
                <DateTimePicker
                    value={opening}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={(_, date) => {
                        setShowOpening(false);
                        if (date) setOpening(date);
                    }}
                />
            )}

            <Text style={styles.label}>Closing Hours:</Text>
            <TouchableOpacity onPress={() => setShowClosing(true)} style={styles.pickerButton}>
                <Text style={styles.pickerText}>{closing.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showClosing && (
                <DateTimePicker
                    value={closing}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={(_, date) => {
                        setShowClosing(false);
                        if (date) setClosing(date);
                    }}
                />
            )}

            <Text style={styles.label}>Phone:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Contact Person:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter contact person"
                value={contact}
                onChangeText={setContact}
            />

            <Text style={styles.label}>Image:</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={{ color: '#888' }}>Tap to upload image</Text>
                )}
            </TouchableOpacity>


            <TouchableOpacity
                onPress={handleFormSubmit}
                style={{ padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8, marginTop: 10 }}>


                <Text style={{ color: '#007BFF', textAlign: 'center', fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DummyFormData;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        margin: 16,
        elevation: 2,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#22223b',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 15,
    },
    pickerButton: {
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    pickerText: {
        fontSize: 15,
        color: '#22223b',
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#c9c9c9',
        borderRadius: 8,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});