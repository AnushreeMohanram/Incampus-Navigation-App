import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Keyboard, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
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
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const { searchQuery = '', filterType = '', departmentName, latitude, longitude } = route.params || {};

  const campusLocations = [
    { id: 1, name: 'Main Building', latitude: 9.882909, longitude: 78.082512, type: 'departments' },
    { id: 2, name: 'Library', latitude: 9.882744, longitude: 78.081243, type: 'facilities' },
    { id: 3, name: 'Food Court', latitude: 9.883353, longitude: 78.083247, type: 'facilities' },
    { id: 4, name: 'Parking Area', latitude: 9.882762, longitude: 78.080839, type: 'parking' },
    { id: 5, name: 'CSE Department', latitude: 9.882886, longitude: 78.083664, type: 'departments' },
    { id: 6, name: 'Back Gate', latitude: 9.881486, longitude: 78.083564, type: 'gates' },
    { id: 7, name: 'T S Srinivasan Centre', latitude: 9.882756, longitude: 78.080579, type: 'facilities' },
    { id: 8, name: 'TCE Ground', latitude: 9.884014, longitude: 78.081513, type: 'grounds' },
    { id: 9, name: 'IT Department', latitude: 9.882570, longitude: 78.083585, type: 'departments' },
    { id: 10, name: 'B Halls', latitude: 9.881859, longitude: 78.082797, type: 'departments' },
    { id: 11, name: 'TCE EIACP PC-RP', latitude: 9.881256, longitude: 78.083662, type: 'departments' },
    { id: 12, name: 'ECE Department', latitude: 9.882978, longitude: 78.082533, type: 'departments' },
    { id: 13, name: 'Woman Empowerment Cell', latitude: 9.882048, longitude: 78.083641, type: 'facilities' },
    { id: 14, name: 'Science Block', latitude: 9.881978, longitude: 78.083173, type: 'departments' },
  ];

  useEffect(() => {
    if (filterType) {
      const filtered = campusLocations.filter((loc) => loc.type === filterType);
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [filterType]);

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
  useEffect(() => {
    const searchValue = searchQuery || searchText.trim();
    if (searchValue !== '') {
      const filtered = campusLocations.filter((loc) =>
        loc.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLocations(filtered);
      setSearchedLocation(filtered.length > 0 ? filtered[0] : null); // Show first matched location
    } else {
      setFilteredLocations([]);
      setSearchedLocation(null); // Reset searched location
    }
    setIsSearchPerformed(true); // Marks the search as performed
  }, [searchText, searchQuery]);

  const handleSuggestionSelect = (location) => {
    setSearchText(location.name); // Set the search bar text to the selected suggestion
    setFilteredLocations([]); // Clear the suggestions list
    Keyboard.dismiss(); // Hide the keyboard
  };

  const handleMarkerPress = (marker) => {
    navigation.navigate(marker.type === 'drinking_station' ? 'DrinkingStation' : 'LocationDetails', {
      locationId: marker.id,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {isSearchPerformed && filteredLocations.length === 0 && (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

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

        {isSearchPerformed && filteredLocations.length > 0 && filteredLocations.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            pinColor={marker.type === 'facilities' ? 'pink' : 'blue'}
            onPress={() => handleMarkerPress(marker)}
          >
            {marker.type === 'drinking_station' ? (
              <Image source={dropIcon} style={styles.dropIcon} />
            ) : null}
            <Callout onPress={() => handleMarkerPress(marker)}>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}

  
{departmentName && latitude && longitude && (
    <Marker coordinate={{ latitude, longitude }} title={departmentName}>
      <Callout onPress={() => handleMarkerPress({ id: departmentName, name: departmentName, latitude, longitude })}>
        <Text>{departmentName}</Text>
      </Callout>
    </Marker>
  )}

        {isSearchPerformed && searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.latitude,
              longitude: searchedLocation.longitude,
            }}
            pinColor="red"
          >
            <Callout onPress={() => handleMarkerPress(searchedLocation)}>
              <Text>{searchedLocation.name}</Text>
            </Callout>
          </Marker>
        )}
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
    borderRadius: 5,
  },
  suggestionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  suggestionText: {
    fontSize: 16,
  },
  suggestionList: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  dropIcon: {
    width: 20,
    height: 20,
  },
});

export default CampusMapScreen;
