import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class Home extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}> Bite </Text>
      </View>
    )
  }
}

export default Home


const styles = StyleSheet.create({
    text: {
      paddingTop: 30,
      color: "white"
    },
  });
  
