import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform, Keyboard, Image } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

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
      setIconPosition(0); 
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

  const convertImageToBase64 = async (uri) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64Image;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const saveAvatarToStorage = async (base64Image) => {
    try {
      await AsyncStorage.setItem('avatar', base64Image);
    } catch (error) {
      console.error('Error saving avatar to storage:', error);
    }
  };

  const selectImage = async () => {
    try {
      if (avatarSource) {
        alert("Fonctionnalité non disponible pour le moment.");
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        if (status !== 'granted') {
          alert('Permission to access media library is required!');
          return;
        }
  
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
  
        console.log(result); // Log the result to debug
  
        if (!result.cancelled) {
          try {
            const base64Image = await convertImageToBase64(result.uri);
            if (base64Image) {
              setAvatarSource({ uri: `data:image/jpeg;base64,${base64Image}` });
              await saveAvatarToStorage(base64Image); // Sauvegarder la nouvelle image dans le stockage local
            } else {
              console.error('Error converting image to base64: Base64 image is null');
            }
          } catch (error) {
            console.error('Error converting image to base64:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
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
