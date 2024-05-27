import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Keyboard } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";

import styles from './style';

export default function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');


  const handleSearch = () => {
    console.log('Recherche:', searchText);
    Keyboard.dismiss();
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
      <View style={styles.profileContainer}>
        <View style={styles.profile}></View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Rechercher...'
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          returnKeyType='search'
          onSubmitEditing={handleSearch}
        />
        {renderSearchButton()}
      </View>
      <View style={styles.choice}>
        <View style={styles.items}>
          <TouchableOpacity style={styles.option}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Langue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.option}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}


