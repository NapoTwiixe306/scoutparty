import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";


const BottomBar = () => {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleIconPress("Home")}
        style={[
          styles.iconWrapper,
          activeIcon === "Home" && styles.activeIcon,
          activeIcon === "Home" && { transform: [{ translateY: -10 }] },
        ]}
      >
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIconPress("CreateEvent")}
        style={[
          styles.iconWrapper,
          activeIcon === "CreateEvent" && styles.activeIcon,
          activeIcon === "CreateEvent" && { transform: [{ translateY: -10 }] },
        ]}
      >
        <Icon name="plus-circle" size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIconPress("Settings")}
        style={[
          styles.iconWrapper,
          activeIcon === "Settings" && styles.activeIcon,
          activeIcon === "Settings" && { transform: [{ translateY: -10 }] },
        ]}
      >
        <Icon name="cog" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

