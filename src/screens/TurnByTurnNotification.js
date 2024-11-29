import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Show notification as an alert
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// List of predefined waypoints
const waypoints = [
  { id: 1, name: 'Main Building', latitude: 9.882909126295969, longitude: 78.08251234664523 },
  { id: 2, name: 'Library', latitude: 9.882744070560484, longitude: 78.0812433648733 },
  { id: 3, name: 'Food Court', latitude: 9.883353073355941, longitude: 78.08324716419759 },
];

// Function to calculate distance between two coordinates in meters using Haversine formula
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Function to send notifications
const sendNotification = async (waypointName) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Turn Alert!',
      body: `You are near ${waypointName}.`,
      sound: true, // Play a sound (optional)
    },
    trigger: null, // Send notification immediately
  });
};

const TurnByTurnNotification = () => {
  const notifiedWaypoints = useRef(new Set());

  useEffect(() => {
    // Request permissions and start location tracking
    const requestPermissions = async () => {
      try {
        // Request Location Permission
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required for this feature.');
          return;
        }

        // Request Notification Permission
        const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
        if (notificationStatus !== 'granted') {
          Alert.alert('Permission Denied', 'Notification permission is required for this feature.');
          return;
        }

        // Start Location Tracking
        startLocationTracking();
      } catch (error) {
        console.error('Error requesting permissions:', error);
        Alert.alert('Error', 'An error occurred while requesting permissions.');
      }
    };

    // Handle incoming notifications when the app is in the foreground
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      const message = notification.request.content.body;
      Alert.alert('New Notification', message);
    });

    // Start the permission request process
    requestPermissions();

    // Clean up the notification listener when the component is unmounted
    return () => {
      notificationListener.remove();
    };
  }, []);

  const startLocationTracking = async () => {
    try {
      // Watch user location
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Check every 10 meters
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          console.log('User Location:', latitude, longitude);
          checkProximity(latitude, longitude);
        }
      );
    } catch (error) {
      console.error('Error watching location:', error);
      Alert.alert('Location Error', 'An error occurred while tracking your location.');
    }
  };

  const checkProximity = (latitude, longitude) => {
    waypoints.forEach((waypoint) => {
      const distance = getDistanceFromLatLonInMeters(
        latitude,
        longitude,
        waypoint.latitude,
        waypoint.longitude
      );

      console.log(`Distance to ${waypoint.name}: ${distance.toFixed(2)} meters`);

      if (distance < 50) {
        if (!notifiedWaypoints.current.has(waypoint.id)) {
          console.log(`User is near ${waypoint.name}. Sending notification.`);
          sendNotification(waypoint.name);
          notifiedWaypoints.current.add(waypoint.id);

          // Optionally, remove the waypoint from the set after some time to allow future notifications
          setTimeout(() => {
            notifiedWaypoints.current.delete(waypoint.id);
            console.log(`Resetting notification status for ${waypoint.name}.`);
          }, 5 * 60 * 1000); // 5 minutes
        }
      } else {
        // If the user moves away from the waypoint, remove it from the notified set
        if (notifiedWaypoints.current.has(waypoint.id)) {
          notifiedWaypoints.current.delete(waypoint.id);
          console.log(`User moved away from ${waypoint.name}. Resetting notification status.`);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Turn-by-Turn Notification Feature Active</Text>
      <Text style={styles.subText}>Stay near your waypoints to receive alerts.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default TurnByTurnNotification;
