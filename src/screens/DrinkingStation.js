import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Text } from 'react-native';

const DrinkingStation = () => {
  const [splashAnimation, setSplashAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation(); // Use navigation hook for button action

  useEffect(() => {
    Animated.timing(splashAnimation, {
      toValue: 10,
      duration: 3000, // Animation duration in ms
      useNativeDriver: true,
    }).start();
  }, []); 

  const animatedStyle = {
    opacity: splashAnimation,
    transform: [
      {
        scale: splashAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1.5],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashContainer, animatedStyle]}>
        <Image
          source={require('../assets/water-icon.png')} // Replace with your icon path
          style={styles.waterIcon}
        />
      </Animated.View>
      <Text style={styles.text}>Nearest Drinking Station Found!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CampusMap')} // Navigates to the Campus Map screen
      >
        <Text style={styles.buttonText}>Go to Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  splashContainer: {
    marginBottom: 20,
  },
  waterIcon: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0D47A1',
  },
  button: {
    backgroundColor: '#42A5F5',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default DrinkingStation;