import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Dimensions, Keyboard, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Sample data for campus and nearby locations
const campusLocations = [
  { id: 1, name: 'Main Building', latitude: 9.882909126295969, longitude: 78.08251234664523 },
  { id: 2, name: 'Library', latitude: 9.882744070560484, longitude: 78.0812433648733 },
  { id: 3, name: 'Food Court', latitude: 9.883353073355941, longitude: 78.08324716419759 },
  // Add more locations as needed
];

const nearbyLocations = [
  { id: 1, name: 'Computer Lab', latitude: 9.883109, longitude: 78.083105 },
  { id: 2, name: 'Parking Area', latitude: 9.882700, longitude: 78.083850 },
  { id: 3, name: 'Auditorium', latitude: 9.883400, longitude: 78.084200 },
  // Add more nearby locations as needed
];

// Function to calculate distance between two locations (in meters)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const CampusMapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNearby, setShowNearby] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const foundLocation = campusLocations.find((loc) =>
      loc.name.toLowerCase().includes(text.toLowerCase())
    );
    if (foundLocation) {
      setSearchedLocation(foundLocation);
      // Check proximity to nearby locations
      const nearby = nearbyLocations.filter((loc) => {
        const distance = getDistance(
          foundLocation.latitude,
          foundLocation.longitude,
          loc.latitude,
          loc.longitude
        );
        return distance <= 200; // Show nearby locations within 200 meters
      });
      setShowNearby(nearby.length > 0); // Show nearby only if there are any within range
    } else {
      setSearchedLocation(null);
      setShowNearby(false);
    }
  };

  const handleMarkerPress = (location) => {
    // Navigate to LocationDetails with the specific location id
    navigation.navigate('LocationDetails', { locationId: location.id });
  };

  const handleMapPress = () => {
    setIsSearchFocused(false);
    setSearchedLocation(null); // Clear searched location when tapping on the map
    setShowNearby(false); // Clear nearby markers as well
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations..."
        value={searchText}
        onChangeText={handleSearch}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => {
          setIsSearchFocused(false);
          setSearchedLocation(null); // Clear searched location when search bar loses focus
          setShowNearby(false); // Clear nearby markers when search bar loses focus
          Keyboard.dismiss();
        }}
      />

      {/* Map View */}
      <MapView
        style={styles.map}
        mapType="satellite"
        initialRegion={{
          latitude: 9.882909126295969,
          longitude: 78.08251234664523,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        onPress={handleMapPress} // Handle map press
      >
        {/* Display current location marker with custom icon */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
          >
            <Image
              source={require('../../assets/marker.png')}
              style={styles.locationIcon}
            />
          </Marker>
        )}

        {/* Display searched location marker (red color) */}
        {searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.latitude,
              longitude: searchedLocation.longitude,
            }}
            title={searchedLocation.name}
            pinColor="red"  // Changed to red
            onPress={() => handleMarkerPress(searchedLocation)} // Navigate to location details on marker press
          />
        )}

        {/* Display nearby markers (blue color) only when showNearby is true */}
        {showNearby && nearbyLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            pinColor="blue"  // Changed to blue
            onPress={() => {
              setSearchedLocation(location);
              navigation.navigate('LocationDetails', { locationId: location.id }); // Navigate to location details on marker press
            }}
          />
        ))}
      </MapView>

      {/* Display search results in a list */}
      {isSearchFocused && (
        <FlatList
          data={campusLocations.filter((loc) =>
            loc.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.searchResults}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() => {
                setSearchedLocation(item);
                setSearchText(item.name);
                setIsSearchFocused(false);
                setShowNearby(true); // Ensure nearby locations show if a valid location is selected
                Keyboard.dismiss();
              }}
            >
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    height: 40,
    borderColor: '#483f75',
    borderWidth: 4,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    position: 'absolute',
    top: 2, // Keeps it at the top of the screen
    left: '5%',
    right: '5%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  searchResults: {
    backgroundColor: 'white',
    maxHeight: 100,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  locationIcon: {
    width: 30, // Icon size
    height: 30,
  },
});

export default CampusMapScreen;

this is the code in anushreeeeee
