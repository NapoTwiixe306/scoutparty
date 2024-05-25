import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
export default function TopBar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity >
          
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Today's Date</Text>
        </View>

        <TouchableOpacity style={styles.logoContainer}>
            <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#2B3639",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    position: "relative",
  },
  logoContainer: {
    alignItems: "flex-start",
  },
  dateContainer: {
    flex: 2,
    alignItems: "center",
  },
  dateText: {
    color: "white",
    fontSize: 18,
  },
});