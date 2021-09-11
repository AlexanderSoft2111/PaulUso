import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

export const Principal = ({navigation}) => {

    return (
        <View style={{flex: 1}}>
            <Button title="Enviar"
                    onPress={() => navigation.navigate('ProductosScreen', {
                            id: "1C"
                        }
                    )}/>
            <Button title="Recibir"
                    onPress={() => navigation.navigate('ProductosScreen', {
                            id: "1A"
                        }
                    )} />           
        </View>
    )
}

const styles = StyleSheet.create({
    productName:{
        fontSize: 20
    },
    itemSeparator: {
        borderTopWidth: 2,
        borderColor: 'gray',
        marginVertical: 10
    }
});

