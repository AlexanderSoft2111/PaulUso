import React from 'react'
import {  FlatList, StyleSheet, Text, View } from 'react-native'




export const OutgoingMessage = ({msj}) => {

   // console.log("ESTE ES UN MENJASE: ",msjEnviado)

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
    marginLeft: 90,
    paddingHorizontal: 20,
    paddingVertical: 10,
}
})
