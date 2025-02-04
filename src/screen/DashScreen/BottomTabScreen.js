import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './BottomTab/SearchScreen';
import EventScreen from './BottomTab/EventScreen';
import FavouritesScreen from './BottomTab/FavouritesScreen';
import ProfileScreen from './BottomTab/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black', 
      }}>
      <Tab.Screen
        name="EventScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={require('../../assets/Calendar_Days.png')}
                style={{width: 27, height: 27}}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="SearchScreen"
        component={EventScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={require('../../assets/search.png')}
                style={{width: 27, height: 27}}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={require('../../assets/heart_outline.png')}
                style={{width: 27, height: 27}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={require('../../assets/user.png')}
                style={{width: 27, height: 27}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
