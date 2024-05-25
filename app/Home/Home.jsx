import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, Keyboard, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './style';
import HotParty from '../../src/components/Party/Party';
export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const handleDeleteParty = async (index) => {
    const updatedParties = [...parties];
    updatedParties.splice(index, 1);
    setParties(updatedParties);
    await AsyncStorage.setItem('parties', JSON.stringify(updatedParties));
  };
  
  const loadParties = async () => {
    try {
      const storedParties = await AsyncStorage.getItem('parties');
      if (storedParties) {
        const parsedParties = JSON.parse(storedParties);
        setParties(parsedParties);
        setFilteredParties(parsedParties);
      }
    } catch (error) {
      console.error('Failed to load parties', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadParties();
    }, [])
  );

  useEffect(() => {
    const filtered = parties.filter(party =>
      party.title.toLowerCase().includes(searchText.toLowerCase()) ||
      party.text.toLowerCase().includes(searchText.toLowerCase()) ||
      party.type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredParties(filtered);
  }, [searchText, parties]);

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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={styles.container}>
        <HotParty 
            title="Top Soirée du moment" 
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus." 
            type="publique" 
          />
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
          
          <View>
            {filteredParties.map((party, index) => (
              <View key={index}>
                <HotParty 
                  title={party.title}
                  text={party.text}
                  type={party.type}
                  onDelete={() => handleDeleteParty(index)} // Passer la fonction de suppression avec l'index de la soirée
                />

              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
