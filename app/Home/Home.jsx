import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, Keyboard, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './style';
import HotParty from '../../src/components/Party/Party';

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
            <HotParty 
              title="Top Soirée du moment" 
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus." 
              type="privé" 
            />
            <HotParty 
              title="Top Soirée du moment" 
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus." 
              type="publique" 
            />
            <HotParty 
              title="Top Soirée du moment" 
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis orci id ligula dapibus." 
              type="restreint" 
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
