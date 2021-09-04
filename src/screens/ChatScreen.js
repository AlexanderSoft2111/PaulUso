import React, { useEffect, useState } from 'react';
import { Button, FlatList, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text,  TextInput,  TouchableOpacity,  View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ObjectId } from "bson";
import { ConsultArticle } from '../components/ConsultArticle';
import { IcomingMessage } from '../components/IcomingMessage';
import { SectionEstado } from '../components/SectionEstado';
import { Chip } from 'react-native-paper';
import { OutgoingMessage } from '../components/OutgoingMessage';
import { getRealmApp } from '../services/getRealmApp';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


let Realm;
let fecha = new Date();
let hoy = fecha.toLocaleDateString();
let item;
let para;
let de;

const conexion = async () =>{
  Realm = await getRealmApp();
}

export const ChatScreen = ({route}) => {
  
  const {_id,usuarioID} = route.params;


  useEffect( () => {
    conexion();
  }, [])
  
  useEffect( () => {
    setTimeout(() => {
      
      cargarMensajes();
    }, 100);
    
  }, [])

  
  const [mensajes, setmensajes] = useState([]);

  const [usuario, setusuario] = useState({
    id: usuarioID.id,
    nombre: 'Alexander Bautista'
  });
 

  const [text, setText] = useState('');
  
  const [online, setonline] = useState(true);

  const onChange = (valor) => {
    //console.log(valor);
    setText(valor);
  }

  const cargarMensajes =  () => {
    const itemEnviado = Realm.objectForPrimaryKey("Item", _id); // search for a realm object with a primary key that is an int.
    console.log('itemEnviado: ',itemEnviado.chat.para);
    console.log('itemEnviado: ',itemEnviado.chat.de);
    item = itemEnviado;

    para = {
        _id: item.creadoPor._id,
        nombre: item.creadoPor.nombre
    };
    
    de = {
      _id: usuario.id,
      nombre: usuario.nombre
    };

    setmensajes(itemEnviado.chat.mensajes);  
  }
  
  
  const crearElemento = () =>{
    
    
    if(text.trim().length > 0 ){
      
      if(item.chat.para._id === null){
        console.log("guarde en la base");
        Realm.write(() => {
  
          item.chat.para = para,
          item.chat.de = de
         
        }); 
      }
            

            const mensaje = {
                _id: new ObjectId(),  
                contenido: text,
                fecha: new Date()
            }
            Realm.write(() => {

              mensajes.push(mensaje);
             
            }); 
            
            setText('');
            cargarMensajes();
         
        } else { return } 

      
    
}
if (item !== undefined){

  return (
      <View style = {styles.container}>

        <View style = {styles.sectionSubtitulo}>
          <Text style={styles.txtPal}>PAL'</Text>
          <Text style={styles.txtUso}>USO</Text>
          <Text style={styles.txtdescripcion}>¡Te ayudamos a encontrar lo que buscas!</Text>
        </View>
       
         <SectionEstado estado={online} nombre={usuario.nombre}></SectionEstado>
       
         
      

        <KeyboardAvoidingView>
          

        <ImageBackground source={require('../assets/images/fondo_de_ropa.jpg')} style={styles.sectionConversation}>
          <ScrollView style={{marginBottom: 120}}>
          <Chip style={styles.chip}>{hoy}</Chip>
          <ConsultArticle descripcion={item.descripcion} img={item.imagen} nombre={usuario.nombre}></ConsultArticle> 
  
          { 
            (usuario.id !== para._id)
            ? mensajes.map(msj => <OutgoingMessage key={msj._id} msj={msj.contenido}></OutgoingMessage>)
            : mensajes.map(msjRecibido => <IcomingMessage key={msjRecibido._id} msjRecibido={msjRecibido.contenido}></IcomingMessage>)
            
          } 

          </ScrollView>
        </ImageBackground>


      </KeyboardAvoidingView>
        <View style = {styles.sectionInput}>
        <TextInput placeholder='Escribe tu mensaje aquí...'
                    multiline
                    clearTextOnFocus
                    value={text}
                    onChangeText={(valorText => onChange(valorText))}
                    style={{maxWidth: 350, marginLeft: 10}}
                   />
       <TouchableOpacity onPress={crearElemento} >
          <Icon name="send" size={24} color="rgba(58, 169, 53, 0.95)" style={{marginRight: 10}}/>
          </TouchableOpacity>     

          
      </View>
        </View>
  )
} return <View></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconMenu: {
    marginLeft: 19
  },

  textChat: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 36
  },

  icono: {
    marginLeft: 250,
  },

  sectionSubtitulo: {
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  txtPal: {
    marginLeft: 20,
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

  txtdescripcion: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },

  sectionConversation: {
   height: '100%'
  },

  chip:{
    width: 100,
    height: 30,
    marginTop: 12,
    alignSelf: 'center'
  },

  sectionInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'

  },


}); 
