import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, Keyboard, ScrollView, Modal, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HotParty from '../../src/components/Party/Party';
import styles from './style';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('tout');

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
    let filtered = parties;

    if (searchText) {
      filtered = filtered.filter(party =>
        party.title.toLowerCase().includes(searchText.toLowerCase()) ||
        party.text.toLowerCase().includes(searchText.toLowerCase()) ||
        party.type.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedFilter && selectedFilter !== 'tout') {
      filtered = filtered.filter(party => party.type.toLowerCase() === selectedFilter.toLowerCase());
    }

    setFilteredParties(filtered);
  }, [searchText, selectedFilter, parties]);

  const handleSearch = () => {
    console.log('Recherche:', searchText);
    Keyboard.dismiss();
  };

  const handleFilter = () => {
    setFilterModalVisible(true);
  };

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterModalVisible(false);
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
                  onDelete={() => handleDeleteParty(index)} 
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filter by Type</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => applyFilter('tout')}
          >
            <View style={selectedFilter === 'tout' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>Tout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => applyFilter('publique')}
          >
            <View style={selectedFilter === 'publique' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>Publique</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => applyFilter('privé')}
          >
            <View style={selectedFilter === 'privé' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>Privée</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => applyFilter('restreint')}
          >
            <View style={selectedFilter === 'restreint' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>Restreint</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}


