import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, Keyboard, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './style';
import HotParty from '../../src/components/Party/Party';

const parties = [
  {
    title: "Top Soirée du moment",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus.",
    type: "publique"
  },
  {
    title: "Soirée de ouf",
    text: "Venez nombreux a cette soirée de ouf, tête à l'envers garantie",
    type: "privé"
  },
  {
    title: "Test",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus.",
    type: "restreint"
  }
];

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [filteredParties, setFilteredParties] = useState(parties);

  useEffect(() => {
    const filtered = parties.filter(party =>
      party.title.toLowerCase().includes(searchText.toLowerCase()) ||
      party.text.toLowerCase().includes(searchText.toLowerCase()) ||
      party.type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredParties(filtered);
  }, [searchText]);

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
              <HotParty 
                key={index}
                title={party.title}
                text={party.text}
                type={party.type}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
