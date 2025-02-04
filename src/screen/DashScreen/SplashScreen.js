import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState(''); 

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setTokens(token); 
        console.log(token, 'token111111111');
        
        setTimeout(() => {
          if (token === null || token === '') {
            navigation.navigate("LoginScreen");
          } else {
            navigation.navigate("BottomTabScreen");
          }
        }, 0); 
      } catch (error) {
        console.error('Error retrieving token', error);
      }
    };

    getToken();
  }, [navigation]);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default SplashScreen;
