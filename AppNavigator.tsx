import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './app/Home/Home';
import CreateEvent from './app/CreateEvent/CreateEvent';
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="CreateEvent" component={CreateEvent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
