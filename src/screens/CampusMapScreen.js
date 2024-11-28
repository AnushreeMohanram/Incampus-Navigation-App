import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Text } from 'react-native';
import dropIcon from '../assets/drop_icon.png'; // Adjust the path if necessary

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const CampusMapScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  // Campus locations data
  const campusLocations = [
    { id: 1, name: 'Main Building', latitude: 9.882909, longitude: 78.082512, type: 'departments' },
    { id: 2, name: 'Library', latitude: 9.882744, longitude: 78.081243, type: 'facilities' },
    { id: 3, name: 'Food Court', latitude: 9.883353, longitude: 78.083247, type: 'facilities' },
    { id: 4, name: 'Parking Area', latitude: 9.882762, longitude: 78.080839, type: 'parking' },
    { id: 5, name: 'CSE Department', latitude: 9.882886, longitude: 78.083664, type: 'departments' },
    { id: 6, name: 'TCE Back Gate', latitude: 9.881486, longitude: 78.083564, type: 'gates' },
    { id: 7, name: 'T S Srinivasan Centre', latitude: 9.882756, longitude: 78.080579, type: 'facilities' },
    { id: 8, name: 'TCE Ground', latitude: 9.884014, longitude: 78.081513, type: 'grounds' },
    { id: 9, name: 'Main Building', latitude: 9.882909, longitude: 78.082512, type: 'drinking_station' },
    { id: 10, name: 'Library', latitude: 9.882744, longitude: 78.081243, type: 'drinking_station' },
    { id: 11, name: 'Food Court', latitude: 9.883353, longitude: 78.083247, type: 'drinking_station' },
    { id: 12, name: 'CSE Department', latitude: 9.882886, longitude: 78.083664, type: 'drinking_station' },
  ];

  // Fetch user's current location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    getLocation();
  }, []);

  // Filter locations based on route parameter (if provided)
  const filteredLocations = route.params?.filterType
    ? campusLocations.filter((loc) => loc.type === route.params.filterType)
    : campusLocations;

  // Handle search logic
  useEffect(() => {
    if (searchText.trim() !== '') {
      const foundLocation = filteredLocations.find((loc) =>
        loc.name.toLowerCase().includes(searchText.toLowerCase())
      );

      if (foundLocation) {
        setSearchedLocation(foundLocation);

        // Nearby locations within 200 meters
        const nearby = filteredLocations.filter((loc) => {
          const distance = getDistance(
            foundLocation.latitude,
            foundLocation.longitude,
            loc.latitude,
            loc.longitude
          );
          return distance > 0 && distance <= 200;
        });

        setNearbyMarkers(nearby);
      } else {
        setSearchedLocation(null);
        setNearbyMarkers([]);
      }
    } else {
      setSearchedLocation(null);
      setNearbyMarkers([]);
    }

    setIsSearchPerformed(true);
  }, [searchText]);

  // Handle marker press
  const handleMarkerPress = (marker) => {
    if (marker.type === 'drinking_station') {
      navigation.navigate('DrinkingStation');
    } else {
      navigation.navigate('LocationDetails', { locationId: marker.id });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.882909,
          longitude: 78.082512,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="satellite"
      >
        {/* User's Current Location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="green"
          />
        )}

        {/* Markers */}
        {filteredLocations.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker)}
          >
            {marker.type === 'drinking_station' ? (
              <Image source={dropIcon} style={styles.dropIcon} />
            ) : null}
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
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
  },
  map: {
    flex: 1,
  },
  dropIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CampusMapScreen;