import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';

const CampusMapScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { searchQuery, filterType } = route.params || {};
  const [markers, setMarkers] = useState([]);

  // Mock marker data
  const mockData = [
    { id: 1, name: 'Library', latitude: 9.8824, longitude: 78.0815, type: 'facilities', description: 'The central library of the campus.' },
    { id: 2, name: 'Main Building', latitude: 9.8823, longitude: 78.0817, type: 'departments', description: 'Main administrative block.' },
    { id: 3, name: 'Cafeteria', latitude: 9.8820, longitude: 78.0813, type: 'facilities', description: 'The student cafeteria.' },
    { id: 4, name: 'Parking Lot', latitude: 9.8818, longitude: 78.0810, type: 'parking', description: 'Main campus parking area.' },
  ];

  useEffect(() => {
    if (searchQuery) {
      // Filter markers by search query
      const searchedMarkers = mockData.filter(marker =>
        marker.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMarkers(searchedMarkers);
    } else if (filterType) {
      // Filter markers by filter type
      const filteredMarkers = mockData.filter(marker => marker.type === filterType);
      setMarkers(filteredMarkers);
    } else {
      // Default: Show all markers
      setMarkers(mockData);
    }
  }, [searchQuery, filterType]);

  const handleMarkerPress = (marker) => {
    navigation.navigate('LocationDetails', { locationId: marker.id });
  };
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.8822, // Campus coordinates
          longitude: 78.0816,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="satellite" // Satellite map view
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            description={`Type: ${marker.type}`}
            onPress={() => handleMarkerPress(marker)} // Navigate to details screen
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CampusMapScreen;
