import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Keyboard } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

import styles from './style';

export default function Home({}) {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  const [activeIcon, setActiveIcon] = useState(null);
  const [iconPosition, setIconPosition] = useState(0);

  const handleIconPress = (iconName) => {
    if (activeIcon === iconName) {
      setActiveIcon(null);
      setIconPosition(0); // Reset icon position
    } else {
      setActiveIcon(iconName);
      setIconPosition(10); 
    }
    navigation.navigate(iconName);
  };

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
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.textAvatar}>Add Picture</Text>
        </View>
        <View style={styles.rightInfos}>
            <Text style={styles.infosText}>Prénom : </Text>
            <Text style={styles.infosText}>Email : </Text>
        </View>
      </View>
      <View style={styles.separator}/>
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
          
          <TouchableOpacity style={styles.option}  onPress={() => handleIconPress("Theme")}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}  onPress={() => handleIconPress("General")}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>General</Text>
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


