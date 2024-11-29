import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Modal, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const FemaleWashroomScreen = () => {
  const [location, setLocation] = useState(null);
  const [washrooms, setWashrooms] = useState([
    { id: 1, latitude: 9.883306483055637, longitude: 78.08300952672789, title: "Common Washroom" },
    { id: 2, latitude: 9.882802315502483, longitude: 78.0837882767329, title: "CSE Dept Washroom" },
    { id: 3, latitude: 9.882201514665207, longitude: 78.0837221961693, title: "IT Ladies Washroom" },
    { id: 4, latitude: 9.882086105752528, longitude: 78.08355590936672, title: "Women Empowerment Cell" },
    { id: 5, latitude: 9.881030364329915, longitude: 78.08362383534514, title: "TCE EIAACP PC Washroom" },
    { id: 6, latitude: 9.881900489493857, longitude: 78.08265066457459, title: "B Halls Washroom" },
    { id: 7, latitude: 9.882339076121992, longitude: 78.08234060169158, title: "Civil Dept Washroom" },
  ]);
  const [nearestWashroom, setNearestWashroom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);  // State to manage modal visibility
  const navigation = useNavigation();

  useEffect(() => {
    // Get user's location when the screen loads
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      // Find the nearest washroom based on user's current location
      const nearest = washrooms.reduce((prev, curr) => {
        const prevDist = Math.sqrt(Math.pow(prev.latitude - location.latitude, 2) + Math.pow(prev.longitude - location.longitude, 2));
        const currDist = Math.sqrt(Math.pow(curr.latitude - location.latitude, 2) + Math.pow(curr.longitude - location.longitude, 2));
        return prevDist < currDist ? prev : curr;
      });
      setNearestWashroom(nearest);
      
      // Show the modal with the nearest washroom
      setModalVisible(true);
    }
  }, [location, washrooms]);

  const handleNavigate = () => {
    if (nearestWashroom) {
      // Construct the Google Maps URL for navigation
      const url = `https://www.google.com/maps?q=${nearestWashroom.latitude},${nearestWashroom.longitude}`;
      
      // Open the URL in the browser or Google Maps app
      Linking.openURL(url).catch(err => Alert.alert("Error", "Could not open the map"));
      
      // Close the modal after navigating
      setModalVisible(false);
    } else {
      Alert.alert('No nearby washroom found.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location ? location.latitude : 9.882909126295969,
          longitude: location ? location.longitude : 78.08251234664523,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="satellite" // Satellite view
      >
        {washrooms.map((washroom) => (
          <Marker
            key={washroom.id}
            coordinate={{
              latitude: washroom.latitude,
              longitude: washroom.longitude,
            }}
            pinColor="#f081ec" // Set the marker color to pink
            title={`Washroom ${washroom.id}`}
            onPress={() => {
              // You can add logic here for marker press
            }}
          />
        ))}
      </MapView>

      {/* Modal to show nearest washroom */}
      <Modal
        visible={modalVisible}
        animationType="slide" // Slide animation for fun effect
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🧻 Nearest Washroom Alert 🧻</Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleNavigate} // Ensure handleNavigate is called
            >
              <Text style={styles.buttonText}>Navigate to Washroom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f081ec',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#f081ec',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default FemaleWashroomScreen;
