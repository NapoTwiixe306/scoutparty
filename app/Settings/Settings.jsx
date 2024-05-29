import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Keyboard, Image } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';

export default function Home({}) {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [activeIcon, setActiveIcon] = useState(null);
  const [iconPosition, setIconPosition] = useState(0);
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    const loadAvatarFromStorage = async () => {
      try {
        const storedAvatar = await AsyncStorage.getItem('avatar');
        if (storedAvatar) {
          setAvatarSource({ uri: `data:image/jpeg;base64,${storedAvatar}` });
        }
      } catch (error) {
        console.error('Error loading avatar from storage:', error);
      }
    };

    loadAvatarFromStorage();
  }, []);

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

  const selectImage = async () => {
    alert("Cette fonctionnalité n'est pas encore disponible")
  };

  const saveAvatarToStorage = async (base64Image) => {
    try {
      await AsyncStorage.setItem('avatar', base64Image);
    } catch (error) {
      console.error('Error saving avatar to storage:', error);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return base64Image.split(',')[1];
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={selectImage} style={styles.avatar}>
            {avatarSource ? (
              <Image source={avatarSource} style={styles.avatarImage} />
            ) : (
              <Text style={styles.textAvatar}>Add Picture</Text>
            )}
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.option} onPress={() => handleIconPress("Theme")}>
            <Icon name="arrow-right" size={20} color="white" />
            <Text style={styles.optionText}>Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => handleIconPress("General")}>
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
