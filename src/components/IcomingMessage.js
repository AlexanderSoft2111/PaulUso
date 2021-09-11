import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const IcomingMessage = ({msj}) => {
    
    if(msj !== null){
        return (
    
            <View style={styles.container}>

                <Text>{msj}</Text>          
            
            </View>
        )
    }
    return <View></View>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: 270,
        minHeight: 50,
        borderColor: 'grey',
        borderRadius: 50,
        marginTop: 20,
        marginLeft: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
    
});
