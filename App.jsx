import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./app/Home/Home";
import CreateEvent from "./app/CreateEvent/CreateEvent";
import Settings from "./app/Settings/Settings";
import BottomBar from "./src/components/Bottom/Bottom";
import TopBar from "./src/components/TopBar/TopBar";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
        <NavigationContainer style={styles.navigationContainer}>
          <TopBar/>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              cardStyle: { backgroundColor: "#2B3639" },
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
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
});