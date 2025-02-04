import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchEvents} from '../../../redux/Action/EventActions';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../redux/Action/FavoritesAction';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const {events, isLoading, error} = useSelector(state => state.events);
  const favoriteEvents = useSelector(state => state.favorites.favoriteEvents);

  useEffect(() => {
    dispatch(fetchEvents());
    loadFavorites(); // Load favorites from local storage
  }, [dispatch]);

  // Load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteEvents');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        parsedFavorites.forEach(event => dispatch(addToFavorites(event)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Save favorites to AsyncStorage
  const saveFavorites = async favorites => {
    try {
      await AsyncStorage.setItem('favoriteEvents', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = event => {
    const isFavorited = favoriteEvents.some(
      favEvent => favEvent.event_date_id === event.event_date_id,
    );

    let updatedFavorites;
    if (isFavorited) {
      dispatch(removeFromFavorites(event.event_date_id));
      updatedFavorites = favoriteEvents.filter(
        favEvent => favEvent.event_date_id !== event.event_date_id,
      );
    } else {
      dispatch(addToFavorites(event));
      updatedFavorites = [...favoriteEvents, event];
    }

    saveFavorites(updatedFavorites); // Save updated favorites
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hello Name</Text>
        <Text style={styles.headerSubtitle}>Are you ready to dance?</Text>
      </View>

      {/* Red separator */}
      <View style={styles.separator} />

      {/* Events List */}
      <View style={styles.eventsContainer}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
          showsVerticalScrollIndicator={false}
            data={events}
            keyExtractor={item => item.event_date_id.toString()}
            renderItem={({item}) => {
              const isFavorited = favoriteEvents.some(
                favEvent => favEvent.event_date_id === item.event_date_id,
              );

              return (
                <View style={styles.eventItem}>
                  <Image
                    source={require('../../../assets/arrow-right.png')}
                    style={styles.arrowIcon}
                  />

                  <Image
                    source={{uri: item.event_profile_img}}
                    style={styles.eventImage}
                  />
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{item.event_name}</Text>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventDate}>{item.readable_from_date}</Text>
                      <Text style={styles.eventLocation}>
                        {item.city}, {item.country}
                      </Text>
                    </View>

                    <Text style={styles.eventPrice}>${item.event_price_to}</Text>

                    {/* Dance Styles and Favorite Button */}
                    <View style={styles.footer}>
                      <View style={styles.danceStylesContainer}>
                        {item.danceStyles?.map(dance => (
                          <Text key={dance.ds_id} style={styles.danceStyle}>
                            {dance.ds_name}
                          </Text>
                        ))}
                      </View>

                      <View style={styles.iconsContainer}>
                        <TouchableOpacity>
                          <Image source={require('../../../assets/share.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                          <Image
                            source={
                              isFavorited
                                ? require('../../../assets/like.png')
                                : require('../../../assets/unlike.png')
                            }
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    padding: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'gray',
  },
  separator: {
    height: 10,
  },
  eventsContainer: {
    flex: 1,
    padding: 10,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 7,
    borderRadius: 10,
  },
  arrowIcon: {
    height: 25,
    width: 25,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDate: {
    fontSize: 14,
    color: 'gray',
  },
  eventLocation: {
    fontSize: 14,
    color: '#444',
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  danceStylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  danceStyle: {
    fontSize: 14,
    color: '#444',
    marginRight: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SearchScreen;
