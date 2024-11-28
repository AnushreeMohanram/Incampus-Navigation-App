import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

const CampusMapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location: passedLocation, markerColor } = route.params || {};

  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);

  const campusLocations = [
    { id: '1', name: 'Main Building', latitude: 9.882909, longitude: 78.082512 },
    { id: '2', name: 'Library', latitude: 9.882744, longitude: 78.081243 },
    { id: '3', name: 'Cafeteria', latitude: 9.883112, longitude: 78.083412 },
    { id: '4', name: 'Parking Area', latitude: 9.882762, longitude: 78.080839 },
  ];

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const foundLocation = campusLocations.find((loc) =>
      loc.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedLocation(foundLocation || null);
  };

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for locations..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            mapType="satellite"
          >
            {/* Current Location Marker */}
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              pinColor="green"
            />

            {/* Passed Location Marker */}
            {passedLocation && (
              <Marker
                coordinate={{
                  latitude: passedLocation.latitude,
                  longitude: passedLocation.longitude,
                }}
                pinColor={markerColor || 'red'}
              >
                <Callout>
                  <Text>{passedLocation.name}</Text>
                </Callout>
              </Marker>
            )}

            {/* Searched Location Marker */}
            {searchedLocation && (
              <Marker
                coordinate={{
                  latitude: searchedLocation.latitude,
                  longitude: searchedLocation.longitude,
                }}
                pinColor="blue"
              >
                <Callout>
                  <Text>{searchedLocation.name}</Text>
                </Callout>
              </Marker>
            )}
          </MapView>
        </>
      ) : (
        <Text>Loading your location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CampusMapScreen;
