import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HotParty = ({ title, text, type, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = () => {
    Alert.alert(
      'Supprimer la soirée',
      'Êtes-vous sûr de vouloir supprimer cette soirée ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: onDelete, // Appeler la fonction de suppression
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
    setShowMenu(false); 
  };
  const renderPartyType = () => {
    let backgroundColor, label;

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
        icon = 'question';
    }

    return (
      <View style={[styles.partyTypeContainer, { backgroundColor: labelColor }]}>
        <Icon name={icon} size={20} color="white" style={styles.icon} />
        <Text style={styles.partyTypeLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          {renderPartyType()}
        </View>
      </TouchableOpacity>
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.menuOption}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  partyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 10,
    marginVertical: 5,
    width: 125,
    borderRadius: 15,
    position: "relative",
    left: 230,
    top: -10
  },
  partyTypeLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    zIndex: 1, 
  },
  menuOption: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  icon: {
    marginRight: 15,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
});

export default HotParty;
