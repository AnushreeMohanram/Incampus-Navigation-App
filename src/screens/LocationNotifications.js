// screens/LocationNotifications.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const LocationNotifications = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      // Request location and notification permissions here
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      let { status: notificationStatus } = await Notifications.requestPermissionsAsync();

      if (locationStatus !== 'granted' || notificationStatus !== 'granted') {
        console.log('Permissions not granted');
      }
    };

    const startTrackingLocation = async () => {
      await Location.startLocationUpdatesAsync('location-tracking-task', {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5000, // meters
        showsBackgroundLocationIndicator: true,
      });
    };

    const checkForRegion = async () => {
      const { coords } = await Location.getCurrentPositionAsync({});
      const targetRegion = {
        latitude: 9.9258, // Replace with your college's latitude
        longitude: 78.1208, // Replace with your college's longitude
        radius: 100, // in meters
      };

      const distance = Location.distance(coords, targetRegion);
      if (distance < targetRegion.radius) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Location Alert",
            body: "You are within the target location!",
          },
          trigger: null,
        });
      }
    };

    requestPermissions();
    startTrackingLocation();
    const interval = setInterval(checkForRegion, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <View>
      <Text>Location Notifications Example</Text>
    </View>
  );
};

export default LocationNotifications;
