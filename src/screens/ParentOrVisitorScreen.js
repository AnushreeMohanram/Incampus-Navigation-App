import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ParentOrVisitorScreen = ({ route, navigation }) => {

  const handleProceed = () => {
    // Navigate to the Home Drawer (assuming it's called "HomeDrawer")
    navigation.navigate('HomeDrawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What are you here for?</Text>
      <TextInput style={styles.input} placeholder="Enter purpose of visit" />

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#333',
  },
  input: { 
    width: '80%', 
    padding: 15, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ParentOrVisitorScreen;
