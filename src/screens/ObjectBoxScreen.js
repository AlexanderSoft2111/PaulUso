import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ObjectBoxScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ObjectBoxScreen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1  
    },
    title: {
        fontSize: 20,
        borderWidth: 2,
        paddingHorizontal: 100,
        paddingVertical: 30,
        marginHorizontal: 10,
        marginVertical: 20     
    }
})
