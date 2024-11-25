import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, Image } from 'react-native';

// Sample campus locations
const campusLocations = [
  { 
    id: 1, 
    name: 'Main Building', 
    latitude: 9.882909126295969, 
    longitude: 78.08251234664523,
    image: require('../../assets/mainbuilding.jpeg'), 
    description: 'The main academic building',
    hours: '9am - 5pm',
  },
  { 
    id: 2, 
    name: 'Library', 
    latitude: 9.882744070560484, 
    longitude: 78.0812433648733,
    image: require('../../assets/library.jpeg'), 
    description: 'Central library of the campus',
    hours: '8am - 8pm',
  },
  { 
    id: 3, 
    name: 'Food Court', 
    latitude: 9.883353073355941, 
    longitude: 78.08324716419759,
    image: require('../../assets/foodcourt.jpeg'), 
    description: 'Food court with various cuisines',
    hours: '9am - 5pm',
  },
  { 
    id: 7, 
    name: 'T S Srinivasan Centre', 
    latitude: 9.882756, 
    longitude: 78.08324716419759,
    image: require('../../assets/centre.jpg'), 
    description: 'Research foundation',
    hours: '9am - 5pm',
  },
  { 
    id: 8, 
    name: 'TCE Ground', 
    latitude: 9.883993744748045, 
    longitude:  78.08150340208562,
    image: require('../../assets/ground.png'), 
    description: 'Spacious outdoor main ground',
    hours: '6am - 8pm',
  },
];

const LocationDetailsScreen = ({ route }) => {
  // Retrieve the locationId passed through the route
  const { locationId } = route.params;

  // Find the location based on the passed ID
  const location = campusLocations.find(loc => loc.id === locationId);

  // Check if the location was found
  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Location not found!</Text>
      </View>
    );
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

    // Check if the URL can be opened and prompt the user to open the map
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Unable to open map.");
        } else {
          Alert.alert(
            "Open in Maps",
            `Would you like to get directions to ${location.name}?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open",
                onPress: () => {
                  Linking.openURL(url).catch(() =>
                    Alert.alert("Error", "Failed to open the map.")
                  );
                },
              },
            ]
          );
        }
      })
      .catch(() => Alert.alert("Error", "An unexpected error occurred."));
  };

  return (
    <View style={styles.container}>
      {/* Display the location image */}
      {location.image ? (
        <Image 
          source={location.image}
          style={styles.locationImage}
        />
      ) : (
        <Text style={styles.errorText}>No image available</Text>
      )}
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.details}>Description: {location.description}</Text>
      <Text style={styles.details}>Operating Hours: {location.hours}</Text>

      {/* Button to open directions in Google Maps */}
      <Button
        title="Get Directions"
        onPress={openMap}
        color="#1E90FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default LocationDetailsScreen;
