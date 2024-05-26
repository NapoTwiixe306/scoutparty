import React, { useState, useEffect, useFocusEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CreateEvent() {
  const [newPartyTitle, setNewPartyTitle] = useState('');
  const [newPartyText, setNewPartyText] = useState('');
  const [newPartyType, setNewPartyType] = useState('publique');
  const [userId, setUserId] = useState(null); // State to store user ID

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Failed to load user ID:', error);
      }
    };

    loadUserId();
  }, []);

  const handleCreateParty = async () => {
    if (newPartyTitle && newPartyText && newPartyType && userId) {
      try {
        const response = await fetch('http://192.168.0.20:5000/create-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userId}` // Sending user ID with authorization header
          },
          body: JSON.stringify({
            title: newPartyTitle,
            text: newPartyText,
            type: newPartyType
          }),
        });
        if (response.ok) {
          console.log('Event created successfully');
          setNewPartyTitle('');
          setNewPartyText('');
          setNewPartyType('publique');
        } else {
          console.error('Failed to create event');
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    } else {
      console.log('Please fill out all fields or User ID not found');
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
  )
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
