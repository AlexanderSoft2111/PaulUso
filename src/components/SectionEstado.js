import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const SectionEstado = ({estado, nombre}) => {

  const fecha = new Date();
  
  const hoy = fecha.toLocaleDateString();
    
  return (
        <View style = {styles.sectionEstado}>

          <Text style={styles.iconCircle}>
          
            <Icon name="circle" style={[styles.iconCircle, (estado) ? styles.activo : styles.inactivo]}/>
          
          </Text>
          
          <Avatar.Image style={styles.avatar} size={24} source={require('../assets/images/avatar.jpg')}/>
          
          <Text style={styles.txtNombre}>{nombre}</Text>
          
          <Text style={styles.txtFecha}>{hoy}</Text>
      
      </View>
    )
}

const styles = StyleSheet.create({
    sectionEstado: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
      },
    
      iconCircle: {
        marginLeft: 19,
        fontSize: 10
      },

      activo: {
        color: 'rgba(58, 169, 53, 0.95)'
      },

      inactivo: {
        color: 'grey'
      },
    
      avatar:{
        marginHorizontal: 8,
      },
    
      txtNombre: {
        fontSize: 12,
        marginLeft: 8
      },
    
      txtFecha: {
        fontSize: 10,
        marginLeft: '40%'
      }
});

