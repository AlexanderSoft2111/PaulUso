import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text,  TextInput,  TouchableOpacity,  View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//importaciones de metodos de realm
import { ObjectId } from "bson";
import { getRealm } from '../services/getRealm';

//importaciones de componentes propios creados en react native
import { ConsultArticle } from '../components/ConsultArticle';
import { IcomingMessage } from '../components/IcomingMessage';
import { SectionEstado } from '../components/SectionEstado';
import { Chip } from 'react-native-paper';
import { OutgoingMessage } from '../components/OutgoingMessage';



//para transformar la fecha de hoy en un string
let fecha = new Date();
let hoy = fecha.toLocaleDateString();

//Declrarmos variables vacias para poder llamar la instancia de realm, obtener los datos de los items y 
//establecer los datos de para quien y cual envian el mensaje 
let Realm;
let item;
let para;
let de;

const conexion = async () =>{

  Realm = await getRealm();

}

export const ChatScreen = ({route}) => {
  
  //desestructuramos los valores del ID del item y del usuario que pasamos desde el producto
  const {_id,usuarioID} = route.params;

  useEffect( () => {

    conexion();

  }, [])
  
  //Ejecutamos que despues de hacer la conexión al segundo carguen los mensajes para evitar el error de que los datos son indefinidos
  useEffect( () => {

    setTimeout(() => {  
      cargarMensajes();
    }, 1000);
    
  }, [])
  
  //Ejecutamos despues de 1 segundo la funcion para escuchar los cambios del objeto
  useEffect( () => {
    
    setTimeout(() => {
      watch();
    }, 1000);
    
  }, []) 
  
  //Declaramos un valor que debe sere mutable para el alto del componente scrollview
  const scrollRef = useRef()
  
  //Iniciamos todos los mensajes del chat como vacios para no tener el error de datos indefinidos
  const [chat, setchat] = useState([]); 
  
  //Establecemos como prueba los datos del usuario logeado
  const [usuario, setusuario] = useState({
    
    id: usuarioID.id,
    nombre: 'Alexander Bautista'
    
  });
  
  //Establecemos una variable para saber si el usuario esta conectado, cambiar por el estado del usuario logeado
  const [online, setonline] = useState(true);
  
  //Inicializamos una variable para atrapar el texto del input para redactar el mensaje
  const [text, setText] = useState('');
  
//Función para obtener el valor del input
  const onChange = (valor) => {

    setText(valor);

  }

  //Funcion para buscar y cargar el item y todos sus atributos 
  const cargarMensajes =  () => {

    //Buscamos el item y retornamos su valor por apuntando a la colección con su ID
    const itemEnviado = Realm.objectForPrimaryKey("Item", _id); 

    //Cargamos el item en la variable global
    item = itemEnviado;

    //Establecemos para quien es el mensaje
      para = {

        _id: item.creadoPor._id,
        nombre: item.creadoPor.nombre

    };
    
    //Establecemos quien envia el mensaje
    de = {

      _id: usuario.id,
      nombre: usuario.nombre

    };
  
    //Preguntamos que si el chat no es nulo cargue los mensajes que ya estan en la base
    if(item.chat !== null){
        setchat(item.chat); 
    } 

  }
  
  //funcion para enviar un mensaje a la base de datos
  const crearElemento = () =>{

    //Restringimos el envio de mensajes vacios 
    if(text.trim().length > 0 ){

      //Establecemos quien envia y el remitente dependiendo quien es el usuario logeado
      if(item.creadoPor._id === usuario.id){

        const chat = {

          _id: new ObjectId(),
          para: {
            _id: "1C",
            nombre: "Alexander Bautista"
          },
          de: de,
          mensaje: text,
          fecha: new Date()
          
        }
        
        //Guardamos todo el chat en el arreglo de los chats de la base de datos
          Realm.write(() => {

            item.chat.push(chat);
           
          }); 

      } else {

        const chat = {

          _id: new ObjectId(),
          para: para,
          de: de,
          mensaje: text,
          fecha: new Date()
          
        }
        
        //Guardamos todo el chat en el arreglo de los chats de la base de datos
          Realm.write(() => {

            item.chat.push(chat);
           
          }); 
      }

      //Reseteamos el valor del input para enviar otro mensaje
      setText('');

      cargarMensajes();
          
    } else { return } 
  }

  //funcion para observar todos los cambios del objeto
  const watch = () => {

    if(Realm !== undefined){

    //Declaramos una funcion que se activara cada vez que detecte un cambio en el objeto
    const onRealmChange = () => {

      //Cada vez que haya un cambio deben cargarse nuevamente los mensajes
      cargarMensajes();
    
    }

    // Con el metodo addListener del realm, enviamos el parameto del cambio y la funcion que debe ejecutarse
    Realm.addListener("change", onRealmChange);

    }
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
            
              <ScrollView style={{marginBottom: 120}}
                            ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
              
                <Chip style={styles.chip}>{hoy}</Chip>
              
                <ConsultArticle descripcion={item.descripcion} img={item.imagen} nombre={usuario.nombre}></ConsultArticle> 
              
              {
                  chat.map(chat => {
                      if(chat.de._id === usuario.id){

                      return <OutgoingMessage key={chat._id} msj={chat.mensaje}></OutgoingMessage>;

                      } 
                      else  {
                  
                            return <IcomingMessage key={chat._id} msj={chat.mensaje}></IcomingMessage>;
                      }
                  })
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
                        style={{width: '90%', marginLeft: 10}}
                      />
            <TouchableOpacity onPress={crearElemento} >
            
              <Icon name="send" size={24} color="rgba(58, 169, 53, 0.95)" style={{marginRight: '3%'}}/>
            
            </TouchableOpacity>     

            
        </View>

      </View>
    )
  } 
  return <View></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
