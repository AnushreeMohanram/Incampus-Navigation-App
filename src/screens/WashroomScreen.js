import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const WashroomScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Show the custom modal when the screen loads
    setModalVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      {/* Left Side - Pink for Female */}
      <TouchableOpacity
        style={[styles.side, styles.leftSide]}
        onPress={() => navigation.navigate('FemaleWashroom')}
      >
        <Icon name="venus" size={50} color="white" /> {/* Female Icon */}
        <Text style={styles.label}>Women</Text> {/* Women Label */}
      </TouchableOpacity>

      {/* Right Side - Blue for Male */}
      <TouchableOpacity
        style={[styles.side, styles.rightSide]}
        onPress={() => navigation.navigate('MaleWashroom')}
      >
        <Icon name="mars" size={50} color="white" /> {/* Male Icon */}
        <Text style={styles.label}>Men</Text> {/* Men Label */}
      </TouchableOpacity>

      {/* Custom Modal for Fun Text */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Tap on your color to find the nearest washrooms!</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Keep the layout side by side
  },
  side: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSide: {
    backgroundColor: '#f081ec', // Pink color for Female
  },
  rightSide: {
    backgroundColor: '#186aed', // Blue color for Male
  },
  label: {
    marginTop: 10, // Spacing between the icon and text
    fontSize: 18,
    color: 'white', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff', // White background for the modal
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow effect on Android
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Darker text color for readability
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#186aed', // Blue color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff', // White text on the button
    fontSize: 18,
  },
});

export default WashroomScreen;
