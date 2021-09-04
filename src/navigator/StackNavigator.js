import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductosScreen } from '../screens/ProductosScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { Principal } from '../screens/Principal';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  return (
    <Stack.Navigator 

    //initialRouteName se utiliza para definir que componente debe mostrar primero la app
    //  initialRouteName="Pagina3Screen"
    screenOptions={{
      headerStyle:{
        elevation: 0,
        shadowColor: 'transparent'
      },
      cardStyle:{
        backgroundColor:'white'
      }
    }}
    >
      <Stack.Screen name="Principal" options={{title:"Principa"}} component={Principal} />
      <Stack.Screen name="ProductosScreen" options={{title:"Productos"}} component={ProductosScreen} />
      <Stack.Screen name="ChatScreen" options={{title:"Chat"}} component={ChatScreen} />
    </Stack.Navigator>
  );
}