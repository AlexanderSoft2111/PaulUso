import React from 'react'
import { Button, View } from 'react-native'


export const Principal = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <Button title="Enviar"
                    onPress={() => navigation.navigate('ProductosScreen', {
                        id: "123"
                    })}/>
            <Button title="Recibir"
                    onPress={() => navigation.navigate('ProductosScreen', {
                        id: "4"
                    })} />
        </View>
    )
}
