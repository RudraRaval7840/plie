import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          console.log('Retrieved user data:', parsedData);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {userData ? (
        <Card style={styles.card}>
          <View style={styles.profileContainer}>
            <Image
              source={
                userData.usr_profile
                  ? { uri: `https://yourapi.com/profile_images/${userData.usr_profile}` }
                  : require('../../../assets/user.png') // Fallback image
              }
              style={styles.profileImage}
            />
          </View>
          <Card.Content>
            <Title style={styles.title}>{userData.usr_fname} {userData.usr_lname}</Title>
            <Paragraph style={styles.text}>Username: {userData.usr_username}</Paragraph>
            <Paragraph style={styles.text}>Email: {userData.usr_email}</Paragraph>
            <Paragraph style={styles.text}>User ID: {userData.usr_id}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <ActivityIndicator animating={true} size="large" color="#6200ee" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
});

export default ProfileScreen;
