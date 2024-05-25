import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import PartyType from '../../src/components/Type/Type';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  
  const handleSearch = () => {
    console.log('Recherche:', searchText);
    Keyboard.dismiss(); 
  };

  const handleFilter = () => {
    console.log('Filtrage');
  };

  const renderSearchButton = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hotparty}>
        <Text style={styles.title}>Top Soirée du moment</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus.</Text>
        <PartyType type="publique"/>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Trouver une soirée proche de moi..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        {renderSearchButton()}
        <TouchableOpacity style={styles.button} onPress={handleFilter}>
          <Icon name="filter" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 10,
    paddingLeft: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
