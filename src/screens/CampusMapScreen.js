import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Text } from 'react-native';

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
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // Track if search has been performed

  // Extract params from route if available
  const { searchQuery = '', filterType = '' } = route.params || {}; // Default empty strings if undefined

  // Sample campus locations data
  const campusLocations = [
    { id: 1, name: 'Main Building', latitude: 9.882909, longitude: 78.082512, type: 'departments' },
    { id: 2, name: 'Library', latitude: 9.882744, longitude: 78.081243, type: 'facilities' },
    { id: 3, name: 'Food Court', latitude: 9.883353, longitude: 78.083247, type: 'facilities' },
    { id: 4, name: 'Parking Area', latitude: 9.882762, longitude: 78.080839, type: 'parking' },
    { id: 5, name: 'CSE Department', latitude: 9.882886, longitude: 78.083664, type: 'departments' },
    { id: 6, name: 'TCE Back Gate', latitude: 9.881486, longitude: 78.083564, type: 'gates' },
    { id: 7, name: 'T S Srinivasan Centre', latitude: 9.882756, longitude: 78.080579, type: 'facilities' },
    { id: 8, name: 'TCE Ground', latitude: 9.884014, longitude: 78.081513, type: 'grounds' },
  ];

  // Filter locations based on `filterType` received from Route params or defaults
  useEffect(() => {
    if (filterType) {
      const filtered = campusLocations.filter((loc) => loc.type === filterType);
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]); // No locations if filter is not defined
    }
  }, [filterType]);

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

  // Handle search logic
  useEffect(() => {
   
    if (searchQuery || searchText.trim() === '') {
      const text = searchQuery || searchText;

      if (text.trim() !== '') {
        // Case-insensitive search for partial matches
        const foundLocation = campusLocations.find((loc) =>
          loc.name.toLowerCase().includes(text.toLowerCase())
        );

        if (foundLocation) {
          setSearchedLocation(foundLocation);
          const nearby = campusLocations.filter((loc) => {
            const distance = getDistance(
              foundLocation.latitude,
              foundLocation.longitude,
              loc.latitude,
              loc.longitude
            );
            return distance > 0 && distance <= 200; // Distance threshold for nearby markers
          });

          setNearbyMarkers(nearby);
        } else {
          setSearchedLocation(null);
          setNearbyMarkers([]);
        }
      } else {
        // If no search query, reset the search results
        setSearchedLocation(null);
        setNearbyMarkers([]);
      }

      // Mark that the search has been performed
      setIsSearchPerformed(true);
    }
  }, [searchQuery, searchText]);
  useEffect(() => {
    if (searchText.trim() !== '') {

  
      // Search for the location based on searchText
      const foundLocation = campusLocations.find((loc) =>
        loc.name.toLowerCase().includes(searchText.toLowerCase())
      );
  
      if (foundLocation) {
        setSearchedLocation(foundLocation);
  
        // Nearby locations within a certain radius
        const nearby = campusLocations.filter((loc) => {
          const distance = getDistance(
            foundLocation.latitude,
            foundLocation.longitude,
            loc.latitude,
            loc.longitude
          );
          return distance > 0 && distance <= 200; // Nearby locations within 200 meters
        });
  
        setNearbyMarkers(nearby);
      } else {
        setSearchedLocation(null);
        setNearbyMarkers([]);
      }
    } else {
      // If no search text, reset the search results
      setSearchedLocation(null);
      setNearbyMarkers([]);
    }
  
    setIsSearchPerformed(true); // Mark that a search has been performed
  }, [searchText]); // Trigger search whenever searchText changes
  

  const handleMarkerPress = (marker) => {
    navigation.navigate('LocationDetails', { locationId: marker.id });
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

        {/* Only show filtered locations if filter is applied and search is not performed */}
        {isSearchPerformed && filteredLocations.length > 0 && filteredLocations.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.type === 'facilities' ? 'pink' : 'blue'} // Facilities are pink
          >
            <Callout onPress={() => handleMarkerPress(marker)}>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}

        {/* Show searched location with red marker after search */}
        {isSearchPerformed && searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.latitude,
              longitude: searchedLocation.longitude,
            }}
            pinColor="red" // Red marker for searched location
          >
            <Callout onPress={() => handleMarkerPress(searchedLocation)}>
              <Text>{searchedLocation.name}</Text>
            </Callout>
          </Marker>
        )}

        {/* Show nearby locations with blue marker after search */}
        {isSearchPerformed && nearbyMarkers.length > 0 && nearbyMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor="blue" // Blue marker for nearby locations
          >
            <Callout onPress={() => handleMarkerPress(marker)}>
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
});

export default CampusMapScreen;
