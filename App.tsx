import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./app/Home/Home";
import TopBar from "./src/components/Topbar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TopBar />

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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3639",
    paddingTop: 30,
    color: "white"
  },
});
