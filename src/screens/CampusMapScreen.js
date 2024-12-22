import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Keyboard, Image } from 'react-native';
=======
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Keyboard } from 'react-native';
>>>>>>> adf8e27 (My new Changes)
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
<<<<<<< HEAD

  const { searchQuery = '', filterType = '', departmentName, latitude, longitude } = route.params || {};
=======
  const [filterType, setFilterType] = useState(route.params?.filterType || '');
  const [showSearchButton, setShowSearchButton] = useState(false);

  // Reset searchText when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
      setShowSearchButton(false);
    }, [])
  );

  // Destructure the params, with fallback values
  const { searchQuery = '', departmentName, latitude, longitude } = route.params || {};
>>>>>>> adf8e27 (My new Changes)

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
<<<<<<< HEAD
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
=======
    { id: 13, name: 'Woman Empowerment Cell', latitude: 9.882047679865266, longitude: 78.08364092299794, type: 'facilities' },
    { id: 14, name: 'Science Block', latitude: 9.881977714735674, longitude: 78.08317317838197, type: 'departments' },
    { id: 15, name: 'Civil Department', latitude: 9.882239492713243, longitude: 78.0832000805217, type: 'departments' },
  ];

  // Filter locations based on selected filter type and search query
  useEffect(() => {
    let filtered = campusLocations;

    if (filterType) {
      filtered = filtered.filter((loc) => loc.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter((loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLocations(filtered);
    setIsSearchPerformed(true);
  }, [searchQuery, filterType]);

  useEffect(() => {
>>>>>>> adf8e27 (My new Changes)
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

<<<<<<< HEAD
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
=======
  const handleSuggestionSelect = (location) => {
    setSearchText(location.name);
    setFilteredLocations([]);
    Keyboard.dismiss();
>>>>>>> adf8e27 (My new Changes)
  };

  const handleMarkerPress = (marker) => {
    navigation.navigate('LocationDetails', { locationId: marker.id });
  };

  const handleSearchButtonClick = () => {
    navigation.navigate('CampusMapScreen', { searchQuery: searchText });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations..."
        value={searchText}
        onChangeText={setSearchText}
<<<<<<< HEAD
=======
        onFocus={() => setShowSearchButton(true)}
>>>>>>> adf8e27 (My new Changes)
      />
      {showSearchButton && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonClick}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      )}

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

<<<<<<< HEAD
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

=======
>>>>>>> adf8e27 (My new Changes)
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.882909,
          longitude: 78.082512,
<<<<<<< HEAD
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
=======
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
>>>>>>> adf8e27 (My new Changes)
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

<<<<<<< HEAD
        {isSearchPerformed && filteredLocations.length > 0 && filteredLocations.map((marker) => (
=======
        {filteredLocations.map((marker) => (
>>>>>>> adf8e27 (My new Changes)
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
<<<<<<< HEAD
            pinColor={marker.type === 'facilities' ? 'pink' : 'blue'}
            onPress={() => handleMarkerPress(marker)}
          >
            {marker.type === 'drinking_station' ? (
              <Image source={dropIcon} style={styles.dropIcon} />
            ) : null}
=======
            pinColor={
              marker.type === 'facilities'
                ? 'pink'
                : marker.type === 'parking'
                ? 'purple'
                : 'blue'
            }
          >
>>>>>>> adf8e27 (My new Changes)
            <Callout onPress={() => handleMarkerPress(marker)}>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
<<<<<<< HEAD

  
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
=======
>>>>>>> adf8e27 (My new Changes)
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
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
=======
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
  suggestionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
  suggestionList: {
    maxHeight: 200,
    marginHorizontal: 10,
  },
  map: {
    flex: 1,
>>>>>>> adf8e27 (My new Changes)
  },
});

export default CampusMapScreen;
