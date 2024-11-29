import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Favorites = ({ navigation }) => {
  const [places, setPlaces] = useState([
    { id: '1', name: 'Library', isFavorite: true, latitude: 9.882744, longitude: 78.081243 },
    { id: '2', name: 'Main Building', isFavorite: true, latitude: 9.882909, longitude: 78.082512 },
    { id: '3', name: 'Cafeteria', isFavorite: false, latitude: 9.883112, longitude: 78.083412 },
  ]);

  const toggleFavorite = (id) => {
    setPlaces((prev) =>
      prev.map((place) =>
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
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
