import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const PartyType = ({ type }) => {
  let label, labelColor, icon;

  switch (type) {
    case 'publique':
      label = 'Publique';
      labelColor = 'green';
      icon = 'group'; 
      break;
    case 'privé':
      label = 'Privée';
      labelColor = 'red';
      icon = 'times'; 
      break;
    case 'restreint':
      label = 'Restreint';
      labelColor = 'orange';
      icon = 'ban'; 
      break;
    default:
      label = 'Inconnu';
      labelColor = 'black';
      icon = '';
  }

  return (
    <View style={[styles.container, { backgroundColor: labelColor }]}>
      <Icon name={icon} size={20} color="white" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    width: 125,
    borderRadius: 15,
    position: "relative",
    left: 230,
    top: -10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PartyType;
