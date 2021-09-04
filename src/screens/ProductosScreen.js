import React, { useState, useEffect} from 'react'

import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { getRealmApp} from '../services/getRealmApp'
import { ObjectId } from "bson";

//Establacemos la variable Realm para poder instanciar a la funcion de realm y poder abrir el esquema
let Realm;

//Establecemos una variable para poder almacenar los datos para guardar en los productos
let item;

//Declaramos la fecha para enviar en la consulta del producto

const conexion = async () =>{
  Realm = await getRealmApp();
}

export const ProductosScreen = ({navigation,route}) => {

    let userID = route.params;

    useEffect( () => {
        //Llama al open del esquema para editar y consultar datos
         conexion();  
        
    }, [])
    
    //Establecemos el useState para almacenar los productos que consultemos a realm y los inicializamos como un array vacio
    const [productos, setproductos] = useState([]);

    const cargarProductos =  () => {

     //  Con la sentencia objects consultamos todo los datos de la coleccion Productos12
         const item = Realm.objects("Item");
         setproductos(item);
    }
    //Funcion para crear un registro en el chat de tipo producto
    const crearElemento = () =>{
        
        Realm.write(() => {

            Realm.create("Item",
             {
                _id: new ObjectId(),
                descripcion: "Camisa",
                valor: 50,
                imagen: "data:image/jpeg;base64,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",
                creadoPor: {
                        _id: "1",
                        nombre: "Alexander Bautista"
                        },
                chat: 
                    {
                        _id: new ObjectId(),

                    }
            }, 
            /* {
                _id: new ObjectId(),
                descripcion: "Buzo",
                valor: 25.50,
                imagen: "https://cdn.shopify.com/s/files/1/0041/1041/7990/products/SudaderaAdidasCore18concapuchahombrealgodonCV3332azuloscurodepor8com_5_1024x1024.jpg?v=1624689545",
                creadoPor: {
                    _id: "2",
                    nombre: "Max Zuñiga"
                },
                chat: 
                    {
                        _id: new ObjectId(),

                    }    
            }, */
           /*  {
                _id: new ObjectId(),
                descripcion: "Pantalon",
                valor: 34.60,
                imagen: "https://contents.mediadecathlon.com/p298237/k$f91bba2f92800ece8592a177dd31fd7e/sq/pantalon-caza-solognac-steppe-300-hombre-verde.jpg?format=auto&f=800x0",
                creadoPor: {
                    _id: "3",
                    nombre: "Marco Guaman"
                },
                chat: 
                    {
                        _id: new ObjectId(),

                    } 
            }, */
    /*         {
                _id: new ObjectId(),
                descripcion: "Zapatos",
                valor: 100,
                imagen: "https://cdn.shopify.com/s/files/1/1468/2164/products/Dcuero2-10_530x@2x.jpg?v=1619454989",
                creadoPor: {
                    _id: "4",
                    nombre: "Juan Perez"
                },
                chat: 
                    {
                        _id: new ObjectId(),

                    } 
            } */
            );
            
        });                                                                                                                                                                                                    

        cargarProductos();
        
    }

    
    const actualizarElemento = () => {
        
         Realm.write(() => {
             item = productos.filtered("description == 'Camisa4'");
                console.log('este es el item apuntado: ',item);
             const itemEditar = item[0];
            // console.log('este es el item a editar: ',itemEditar)
            //  itemEditar.description = "Pantalon";
                   itemEditar.mensajesEnviados.push(
                       {
                        msjEnviado: "prueba6",
                        fecha: hoy
                       }
                       
                    )            
          });  


        cargarProductos();
    }


    
    const eliminarElemento = () => {
      
        
/*       let id = productos[0]._id;   */


     /*    Realm.write(() => {
             Realm.deleteAll();
            // Delete the task from the realm.
           //  Realm.delete(productos[3])
          });  */  
          //cargarProductos();
          // Realm.close();  
    }



        return (
            <View style={{flex:1, marginTop: 10}}>
                <FlatList
                    data={productos}
                    keyExtractor={(p) => p._id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        onPress={() => navigation.navigate('ChatScreen', {
                            _id: item._id,
                            usuarioID: userID
                        })}
                        >
                            <Text style={styles.productName}>{item.descripcion}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={ () => (
                        <View style={styles.itemSeparator}></View>                                                  
                    )}
                >  
                </FlatList>

            <Button onPress={cargarProductos} title='Cargar'/>
            <Button onPress={crearElemento} title='Crear'/>
            <Button onPress={actualizarElemento} title='Actualizar'/> 
            <Button onPress={eliminarElemento} title='Eliminar'/> 
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
