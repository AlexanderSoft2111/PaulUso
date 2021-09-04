// import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.1.3/socket.io.js";
import 'react-native-gesture-handler'

import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
//import { ChatScreen } from './src/screens/ChatScreen';
//import { Dimensions } from './src/screens/Dimensions';
//import { Flex } from './src/screens/Flex';
//import { ObjectBoxScreen } from './src/screens/ObjectBoxScreen';
//import { Positions } from './src/screens/Positions';
import { NavigationContainer } from '@react-navigation/native';
//import io from 'socket.io-client'
//import { ProductosScreen } from './src/screens/ProductosScreen';
import { StackNavigator } from './src/navigator/StackNavigator';




const App = () => {


 /*  useEffect(() => {
    io('http://127.0.0.1:3001');

  }, []) */

  // const socket = io('http://127.0.0.1:3000', {
  //   transports: ['websocket']
  //  })
  

  // useEffect(() => {
    
  //   socket.on('bienvenido', (msg) => {
  //     console.log(msg)
  //   }) 
  // }, [socket])
  
  return (
    <NavigationContainer>
    <SafeAreaView style={{flex: 1}}>
     
      {/* <Flex></Flex> */}
      {/* <Positions></Positions> */}
      {/* <Dimensions></Dimensions> */}
      {/* <ObjectBoxScreen></ObjectBoxScreen> */}
      {/* <ChatScreen></ChatScreen> */}
      {/* <ProductosScreen></ProductosScreen> */}
      <StackNavigator></StackNavigator>
    </SafeAreaView>
    </NavigationContainer>
  )
}

export default App;