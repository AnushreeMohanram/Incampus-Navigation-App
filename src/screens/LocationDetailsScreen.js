import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, Image } from 'react-native';
import * as Notifications from 'expo-notifications';

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

const nearbyLocations = [
  { id: 1, name: 'Computer Lab', latitude: 9.883109, longitude: 78.083105 },
  { id: 2, name: 'Parking Area', latitude: 9.882700, longitude: 78.083850 },
  { id: 3, name: 'Auditorium', latitude: 9.883400, longitude: 78.084200 },
];

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

const LocationDetailsScreen = ({ route }) => {
  const { locationId } = route.params; // Retrieve the locationId passed through the route
  const location = campusLocations.find((loc) => loc.id === locationId); // Find the location based on the passed ID

  const showNearbyNotifications = () => {
    const nearby = nearbyLocations.filter((loc) => {
      const distance = getDistance(
        location.latitude,
        location.longitude,
        loc.latitude,
        loc.longitude
      );
      return distance <= 200; // Show nearby locations within 200 meters
    });

    if (nearby.length > 0) {
      nearby.forEach((nearbyLoc) => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `Nearby Location: ${nearbyLoc.name}`,
            body: `Located near ${location.name}`,
          },
          trigger: null, // Trigger immediately
        });
      });
    }
  };

  const openMap = async () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

    // Check if the URL can be opened and prompt the user to open the map
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open map.');
        } else {
          Alert.alert(
            'Open in Maps',
            `Would you like to get directions to ${location.name}?`,
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open',
                onPress: () => {
                  showNearbyNotifications(); // Send notifications before opening map
                  Linking.openURL(url).catch((err) =>
                    Alert.alert('Error', 'Failed to open the map.')
                  );
                },
              },
            ]
          );
        }
      })
      .catch((err) => Alert.alert('Error', 'An unexpected error occurred.'));
  };

  return (
    <View style={styles.container}>
      {/* Display the location image */}
      <Image source={location.image} style={styles.locationImage} />
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.details}>Description: {location.description}</Text>
      <Text style={styles.details}>Operating Hours: {location.hours}</Text>

      {/* Button to open directions in Google Maps */}
      <Button title="Get Directions" onPress={openMap} color="#1E90FF" />
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
