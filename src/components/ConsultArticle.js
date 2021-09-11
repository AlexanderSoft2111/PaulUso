import React, {useState} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

let detalle = ''

export const ConsultArticle = ({descripcion,img,nombre}) => {

    const nombreCorto = nombre.split(' ')[0];

    switch (descripcion) {
            case 'Buzo':
                detalle = 'en el';
            break;

            case 'Camisa':
                detalle = 'en la';;
            break;

            case 'Pantalon':
                detalle = 'en el';
            break;

            case 'Zapatos':
                detalle = 'en los';
            break;    
    }

    return (
        <View style={styles.containerArticle}>
            
            <View style={styles.header}>
                
                <Text style={styles.txtPal}>PAL'</Text>
                
                <Text style={styles.txtUso}>USO</Text>
            
            </View>
                
                <View style={styles.body}>
                    
                    <Text style={styles.txtDescripcion}>{nombreCorto} esta interesado {detalle} {descripcion}</Text>
                    
                    <Image
                    style={styles.imagen}
                    source={{
                        uri: img
                    }}
                    />

                </View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    containerArticle:{
        backgroundColor: 'white',
        width: 280,
        height: 55,
        borderRadius: 4,
        marginTop: 15   ,
        alignSelf: 'center'
    },

    header:{
        flexDirection: 'row'
    },

    txtPal: {
        marginLeft: 14,
        fontSize: 12,
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        color: '#1D70B7'
      },
    
      txtUso: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#3AA935'
      },

      body: {
          marginLeft: 14,
          flexDirection: 'row',
          alignItems: 'center'
      },
      txtDescripcion:{
        width: 205,
        fontFamily: 'Roboto',
        fontWeight: 'normal',
        fontSize: 11
      },

      imagen:{
          marginLeft:20,
          width: 21,
          height: 25
      }
});
