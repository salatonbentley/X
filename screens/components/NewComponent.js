import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NewComponent = ({text, color}) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color || styles.button.backgroundColor }]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default NewComponent

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50', // Green
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})