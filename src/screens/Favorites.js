import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const Favorites = ({ navigation }) => {
  const [places, setPlaces] = useState([
    { id: '1', name: 'Library', isFavorite: true, latitude: 9.882744, longitude: 78.081243 },
    { id: '2', name: 'Main Building', isFavorite: true, latitude: 9.882909, longitude: 78.082512 },
    { id: '3', name: 'Cafeteria', isFavorite: false, latitude: 9.883112, longitude: 78.083412 },
  ]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.error('Location permission denied');
          return;
        }
      }
      if (Geolocation) {
        Geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.error('Geolocation is not available');
      }
    };

    requestLocationPermission();
  }, []);

  const toggleFavorite = (id) => {
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      )
    );
  };

  const addFrequentlyVisitedPlace = (name, latitude, longitude) => {
    setPlaces((prev) => [
      ...prev,
      { id: (prev.length + 1).toString(), name, isFavorite: false, latitude, longitude },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {currentLocation && (
        <MapView style={styles.map} region={currentLocation}>
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              pinColor={place.isFavorite ? 'gold' : 'red'}
            />
          ))}
        </MapView>
      )}
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Icon
                name={item.isFavorite ? 'star' : 'star-o'}
                size={24}
                color={item.isFavorite ? '#FFD700' : '#CCC'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CampusMap', {
                  location: {
                    name: item.name,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  },
                  markerColor: 'red', // Red marker for selected location
                  placeName: item.name, // Pass the place name to show the drop icon
                })
              }
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  viewText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default Favorites;
