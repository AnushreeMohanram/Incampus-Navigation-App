import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


const OfflineMapScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/map.png')} // Replace with your image path
        style={styles.mapImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%', // Adjust the width to fill the screen
    height: '100%', // Adjust the height to fit the screen
    resizeMode: 'contain', // Keeps the aspect ratio of the map
  },
});

export default OfflineMapScreen;
