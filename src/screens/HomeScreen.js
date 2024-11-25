import React from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const quickFilters = [
    { id: '1', title: 'Find Departments', type: 'departments' },
    { id: '2', title: 'Locate Facilities', type: 'facilities' },
    { id: '3', title: 'Parking', type: 'parking' },
  ];

  const handleQuickFilter = (filterType) => {
    navigation.navigate('CampusMap', { filterType });
  };

  return (
    <View style={styles.container}>
      {/* Greeting Section */}
      <Text style={styles.greeting}>Hello! Ready to explore the campus?</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for locations..."
        onSubmitEditing={(event) =>
          navigation.navigate('CampusMap', { searchQuery: event.nativeEvent.text })
        }
      />

      {/* Quick Filters Section */}
      <View style={styles.filtersContainer}>
        {quickFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={styles.filterButton}
            onPress={() => handleQuickFilter(filter.type)}
          >
            <Text style={styles.filterText}>{filter.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explore Map Button */}
      <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('CampusMap')}>
        <Text style={styles.exploreButtonText}>Explore the Campus Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  searchBar: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  filterButton: {
    flex: 1,
    margin: 5,
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreButton: {
    marginTop: 20,
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
