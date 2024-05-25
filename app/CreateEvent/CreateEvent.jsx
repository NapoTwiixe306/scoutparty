import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Home()  {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> CreateEvent </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
    text: {
      padding: 30,
      color: "white"
    },
  });
  
