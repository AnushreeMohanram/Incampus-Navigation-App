import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const CampusMap = ({ route }) => {
  const { departmentName, latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{departmentName}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={departmentName} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  map: { flex: 1 },
});

export default CampusMap;
