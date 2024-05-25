import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PartyType from '../Type/Type';

const HotParty = ({ title, text, type }) => {
  return (
    <View style={styles.hotparty}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <PartyType type={type}/>
    </View>
  );
}

const styles = StyleSheet.create({
    hotparty: {
        padding: 15,
        height: 167,
        width: 391,
        backgroundColor: 'rgba(255, 255, 255, 0.63)',
        borderRadius: 15,
        justifyContent: 'flex-start',
        marginBottom: 20,
        gap: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        width: "90%",
        fontSize: 15,
    },
});

export default HotParty;
