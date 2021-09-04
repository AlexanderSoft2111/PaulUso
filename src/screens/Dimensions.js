import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'

export const Dimensions = () => {

    const {width,height} = useWindowDimensions()

    return (
        <View style= {styles.container}>
            <View style={{
                ...styles.cajaMorada,
                width: width * 0.60}}></View>
            <View style={styles.cajaNaranja}></View>
            <Text>W:{width}, H:{height}</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: 500,
        height: '100%',
        backgroundColor: 'red'
    },
    cajaMorada: {
        backgroundColor: 'purple',
        //width: '50%',
        height: 200
    },
    cajaNaranja: {
        backgroundColor: 'orange',
        width: '25%',
        height: 300
    }
});
