import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TopBar() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Adresse</Text>
            <Icon name="pencil" size={20} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#2B3639",
    height: 90
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "white",
    fontSize: 16,
    marginRight: 18,
  },
});
