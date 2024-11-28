import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

const OfflineMap = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 9.882909126295969, // Replace with the latitude of your campus
                longitude: 78.08251234664523, // Replace with the longitude of your campus
                latitudeDelta: 0.005, // Adjust the zoom level as needed
                longitudeDelta: 0.005,
            }}
            mapType="satellite" // Set the map to satellite view
        >
            <UrlTile
                urlTemplate="file:///android_asset/tiles/{z}/{x}/{y}.png" // For Android
                maximumZ={19} // Adjust for your zoom level
                tileSize={256}
            />

            <UrlTile
                urlTemplate="file:///tiles/{z}/{x}/{y}.png" // For iOS
                maximumZ={19}
                tileSize={256}
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default OfflineMap;
