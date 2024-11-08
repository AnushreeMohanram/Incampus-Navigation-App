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
    hours: '10am - 10pm',
  },
];

const LocationDetailsScreen = ({ route }) => {
  const { locationId } = route.params;  // Retrieve the locationId passed through the route
  const location = campusLocations.find(loc => loc.id === locationId);  // Find the location based on the passed ID

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
                  Linking.openURL(url).catch((err) =>
                    Alert.alert("Error", "Failed to open the map.")
                  );
                },
              },
            ]
          );
        }
      })
      .catch((err) => Alert.alert("Error", "An unexpected error occurred."));
  };

  return (
    <View style={styles.container}>
      {/* Display the location image */}
      <Image 
        source={location.image}
        style={styles.locationImage}
      />
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
});

export default LocationDetailsScreen;
