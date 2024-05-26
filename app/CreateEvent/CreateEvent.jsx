import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HotParty from '../../src/components/Party/Party';

export default function CreateEvent() {
  const [parties, setParties] = useState([]);
  const [newPartyTitle, setNewPartyTitle] = useState('');
  const [newPartyText, setNewPartyText] = useState('');
  const [newPartyType, setNewPartyType] = useState('publique'); 

  useEffect(() => {
    const loadParties = async () => {
      try {
        const storedParties = await AsyncStorage.getItem('parties');
        if (storedParties) {
          setParties(JSON.parse(storedParties));
        }
      } catch (error) {
        console.error('Failed to load parties', error);
      }
    };

    loadParties();
  }, []);

  const handleCreateParty = async () => {
    if (newPartyTitle && newPartyText && newPartyType) {
      const newParty = {
        title: newPartyTitle,
        text: newPartyText,
        type: newPartyType
      };
      const updatedParties = [...parties, newParty];
      setParties(updatedParties);
      await AsyncStorage.setItem('parties', JSON.stringify(updatedParties));
      setNewPartyTitle('');
      setNewPartyText('');
      setNewPartyType('publique'); 
    } else {
      console.log('Please fill out all fields');
    }
  };

  const handleDeleteParty = async (index) => {
    const updatedParties = [...parties];
    updatedParties.splice(index, 1);
    setParties(updatedParties);
    await AsyncStorage.setItem('parties', JSON.stringify(updatedParties));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={styles.container}>
          <Text style={styles.text}>CreateEvent</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Titre de la soirée"
              onChangeText={(text) => setNewPartyTitle(text)}
              value={newPartyTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description de la soirée"
              onChangeText={(text) => setNewPartyText(text)}
              value={newPartyText}
            />

            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setNewPartyType('publique')}
              >
                <View style={newPartyType === 'publique' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                <Text style={styles.radioText}>Publique</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setNewPartyType('privé')}
              >
                <View style={newPartyType === 'privé' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                <Text style={styles.radioText}>Privée</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setNewPartyType('restreint')}
              >
                <View style={newPartyType === 'restreint' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                <Text style={styles.radioText}>Restreint</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCreateParty}>
              <Text style={styles.buttonText}>Créer la soirée</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  text: {
    padding: 30,
    color: "black",
    fontSize: 24
  },
  formContainer: {
    width: '100%',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButtonUnselected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10
  },
  radioButtonSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    marginRight: 10
  },
  radioText: {
    fontSize: 16,
    color: 'black'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
