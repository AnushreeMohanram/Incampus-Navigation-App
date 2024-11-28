import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrinkingStation = () => {
  const [bufferAnimation] = useState(new Animated.Value(0)); // Animation value for buffering
  const [showButton, setShowButton] = useState(false); // Controls button visibility
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bufferAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(bufferAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 1, // Run the animation 3 times
      }
    ).start(() => {
      setShowButton(true); // Show the button after animation completes
    });
  }, []);

  const animatedStyle = {
    transform: [
      {
        scale: bufferAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5], // Water drop scales up and down
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {!showButton && (
        <Animated.View style={[styles.waterDrop, animatedStyle]}>
          <Text style={styles.dropText}>💧</Text>
        </Animated.View>
      )}
      {showButton && (
        <View style={styles.whiteBox}>
          <Text style={styles.text}>Splash into Hydration!</Text>
          <Text style={styles.text}>Stay energized on the go!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('CampusMap', { filterType: 'drinking_station' })
            }
          >
            <Text style={styles.buttonText}>Go to Map</Text>
          </TouchableOpacity>
        </View>
      )}
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
  waterDrop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42A5F5',
    width: 70,
    height: 70,
    borderRadius: 35, // Makes the drop circular
  },
  dropText: {
    fontSize: 32,
    color: '#FFFFFF', // White color for the emoji
  },
  whiteBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: '#0D47A1',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#42A5F5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default DrinkingStation;