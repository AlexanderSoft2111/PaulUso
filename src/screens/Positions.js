import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Positions = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cajaVerde}></View>
            <View style={styles.cajaMorada}></View>
            <View style={styles.cajaNaranja}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28C4D9'
    },
    cajaMorada: {
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: '#5856D6',
        position: 'absolute',
        right: 0
    },
    cajaNaranja: {
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: '#F0A23B',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    cajaVerde: {
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: 'green',
        ...StyleSheet.absoluteFillObject
    }
});
