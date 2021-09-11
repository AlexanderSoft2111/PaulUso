import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const OutgoingMessage = ({msj}) => {

    if(msj !== null){

        return (

            <View style={styles.container}>
                
                <Text style={styles.Text}>{msj}</Text>          
                
            </View>
        )
    }
  
    return <View></View>

}

const styles = StyleSheet.create({

container:{
    backgroundColor: '#68b961',
    width: 270,
    minHeight: 50,
    borderColor: 'grey',
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 90,
    paddingHorizontal: 20,
    paddingVertical: 10,
},

Text:{
    color: 'white'

}
})
