import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking'; // To handle deep linking

const WashroomDetailsScreen = ({ route }) => {
  const { washroomId } = route.params; // Receive the washroom ID from the navigation
  const [washroom, setWashroom] = useState(null);

  useEffect(() => {
    // Fetch washroom details using the ID (for now, it's hardcoded)
    const washrooms = [
      { id: 1, latitude: 9.883306483055637, longitude: 78.0830095267278, name: "Washroom 1" },
      { id: 2, latitude: 9.882802315502483, longitude: 78.0837882767329, name: "Washroom 2" },
      { id: 3, latitude: 9.882201514665207, longitude: 78.0837221961693, name: "Washroom 3" },
      // Add other washrooms here
    ];

    const selectedWashroom = washrooms.find(washroom => washroom.id === washroomId);
    setWashroom(selectedWashroom);
  }, [washroomId]);

  const handleNavigate = () => {
    if (washroom) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${washroom.latitude},${washroom.longitude}&travelmode=walking`;
      Linking.openURL(url); // Launch Google Maps for navigation
    }
  };

  return (
    <View style={styles.container}>
      {washroom ? (
        <>
          <Text style={styles.title}>{washroom.name}</Text>
          <Text>Latitude: {washroom.latitude}</Text>
          <Text>Longitude: {washroom.longitude}</Text>
          <Button title="Navigate to Washroom" onPress={handleNavigate} />
        </>
      ) : (
        <Text>Loading washroom details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WashroomDetailsScreen;
