import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromFavorites} from '../../../redux/Action/FavoritesAction';

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favoriteEvents = useSelector(state => state.favorites.favoriteEvents);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hello Name</Text>
        <Text style={styles.headerSubtitle}>Are you ready to dance?</Text>
      </View>

      {/* Red separator */}
      <View style={styles.separator} />
      {favoriteEvents.length === 0 ? (
        <Text style={styles.emptyText}>No favorite events added yet.</Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={item => item.event_date_id.toString()}
          renderItem={({item}) => (
            <View style={styles.eventItem}>
              {/* Event Image */}
              <Image
                source={{uri: item.event_profile_img}}
                style={styles.eventImage}
              />

              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{item.event_name}</Text>

                <View style={styles.eventInfo}>
                  <Text style={styles.eventDate}>
                    {item.readable_from_date}
                  </Text>
                  <Text style={styles.eventLocation}>
                    {item.city}, {item.country}
                  </Text>
                </View>

                {/* Price */}
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
                      <Image
                        source={require('../../../assets/share.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(removeFromFavorites(item.event_date_id))
                      }>
                      <Image
                        source={require('../../../assets/like.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  arrowIcon: {
    height: 25,
    width: 25,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  eventImage: {width: 80, height: 80, borderRadius: 10, marginRight: 10},
  eventDetails: {flex: 1},
  eventTitle: {fontSize: 18, fontWeight: 'bold'},
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDate: {fontSize: 14, color: 'gray'},
  eventLocation: {fontSize: 14, color: 'gray'},
  eventPrice:{fontSize: 14, color: 'black',fontWeight:'bold'},
  emptyText: {textAlign: 'center', fontSize: 16, marginTop: 20},
  header: {
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    padding: 20,
  },
  headerTitle: {fontSize: 25, fontWeight: 'bold'},
  headerSubtitle: {fontSize: 15, color: 'gray'},
  separator: {height: 20},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
  },
  danceStylesContainer: {flexDirection: 'row'},
  danceStyle: {
    fontSize: 12,
    color: 'black',
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  iconsContainer: {flexDirection: 'row'},
  icon: {width: 25, height: 25, marginLeft: 10},
});

export default FavoriteScreen;
