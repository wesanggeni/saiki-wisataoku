import React, { Component,useEffect,useState } from 'react';
import {
  Image,
} from "react-native";
import ScreenHome from '../screen/home';
import ScreenWilayah from '../screen/wilayah';
import ScreenWilayahDetail from '../screen/wilayah/detail';
import ScreenWilayahZoom from '../screen/wilayah/zoom';
import ScreenInfo from '../screen/info';
import ScreenTentang from '../screen/tentang';
import ScreenBacaan from '../screen/bacaan';
import ScreenBacaanDetail from '../screen/bacaan/detail';
import ScreenDestinasi from '../screen/destinasi';
import ScreenDestinasiDetail from '../screen/destinasi/detail';
import ScreenVideo from '../screen/video';
import ScreenWisata from '../screen/wisata';
import ScreenAkomodasi from '../screen/akomodasi';
import ScreenTour from '../screen/tour';
import ScreenPengembangan from '../screen/pengembangan';
import ScreenBlank from '../screen/blank';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const MainTabNav = () => (
    <LinearGradient
start={{x: 0, y: 0}}
end={{x: 1, y: 0}}
colors={['#33a14a', '#2b87d0']}
style={{flex: 1}}>
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#ffff',
        labelStyle: {
          color:'#fff',
          fontSize:10,
          paddingBottom:5,
          marginTop:-6
        },
        tabStyle: {
          borderTop: 'transparent',
        },
        style: {
          boxShadow: 'none',
          elevation: 0,
          borderTopColor:'transparent',
          backgroundColor:'transparent',
          height: 47,
        },
      }}>
      <Tab.Screen name="Home" component={ScreenHome}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/menu1.png')} />
          ),
        }} />
      <Tab.Screen name="Wilayah" component={ScreenWilayah}
        options={{
          tabBarLabel: 'Wilayah',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/menu2.png')} />
          ),
        }} />
      <Tab.Screen name="Info" component={ScreenInfo}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/menu3.png')} />
          ),
        }} />
      <Tab.Screen name="Tentang" component={ScreenTentang}
        options={{
          tabBarLabel: 'Tentang',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/menu4.png')} />
          ),
        }} />
    </Tab.Navigator>
</LinearGradient>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainTabNav} />
        <Stack.Screen name="Wilayah" component={ScreenWilayah} />
        <Stack.Screen name="WilayahDetail" component={ScreenWilayahDetail} />
        <Stack.Screen name="WilayahZoom" component={ScreenWilayahZoom} />
        <Stack.Screen name="Bacaan" component={ScreenBacaan} />
        <Stack.Screen name="BacaanDetail" component={ScreenBacaanDetail} />
        <Stack.Screen name="Destinasi" component={ScreenDestinasi} />
        <Stack.Screen name="DestinasiDetail" component={ScreenDestinasiDetail} />
        <Stack.Screen name="Video" component={ScreenVideo} />
        <Stack.Screen name="Wisata" component={ScreenWisata} />
        <Stack.Screen name="Akomodasi" component={ScreenAkomodasi} />
        <Stack.Screen name="Tour" component={ScreenTour} />
        <Stack.Screen name="Blank" component={ScreenBlank} />
        <Stack.Screen name="Pengembangan" component={ScreenPengembangan} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
