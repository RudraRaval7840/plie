import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screen/AuthScreen/LoginScreen';
import {store} from './src/redux/Store/store';
import {Provider} from 'react-redux';
import BottomTabScreen from './src/screen/DashScreen/BottomTabScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screen/DashScreen/SplashScreen';

const stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        console.log('Token a----ppp:', storedToken);
      } catch (error) {
        console.error('Error retrieving token', error);
      }
    };

    getToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator
          initialRouteName='SplashScreen'>
          
          <stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
