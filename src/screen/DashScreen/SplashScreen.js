import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState(''); // Initializing state for token

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setTokens(token); // Setting the token after fetching it
        console.log(token, 'token111111111');
        
        // Navigation based on token
        setTimeout(() => {
          if (token === null || token === '') {
            navigation.navigate("LoginScreen");
          } else {
            navigation.navigate("BottomTabScreen");
          }
        }, 0); // Set the timeout to navigate after 2.6 seconds
      } catch (error) {
        console.error('Error retrieving token', error);
      }
    };

    getToken();
  }, [navigation]); // Empty dependency array to ensure this runs once when the component mounts

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default SplashScreen;
