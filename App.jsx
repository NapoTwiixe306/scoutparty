import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./app/Home/Home";
import CreateEvent from "./app/CreateEvent/CreateEvent";
import Settings from "./app/Settings/Settings";
import BottomBar from "./src/components/Bottom/Bottom";
import TopBar from "./src/components/TopBar/TopBar";
import Login from "./app/Login/Login";
import General from "./app/Settings/General/General";
import Theme from "./app/Settings/Theme/Theme";

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer>
        <TopBar />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            cardStyle: { backgroundColor: "#2B3639" },
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="General" component={General} />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
        <BottomBar />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
