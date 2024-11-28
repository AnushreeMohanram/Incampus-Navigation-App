// src/navigation/DrawerNavigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens with the correct paths
import HomeScreen from '../screens/HomeScreen';
import CampusMapScreen from '../screens/CampusMapScreen'; // Adjusted the path
import Find from '../screens/Find';
import Favorites from '../screens/Favorites';
import OfflineMap from '../screens/OfflineMap';
import DrinkingStation from '../screens/DrinkingStation';
import Washrooms from '../screens/WashroomScreen';
import Feedback from '../screens/Feedback';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // Show header for each screen
        drawerType: 'front', // Drawer slide effect
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Campus Map" component={CampusMapScreen} />
      <Drawer.Screen name="Find" component={Find} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="Offline Map" component={OfflineMap} />
      <Drawer.Screen name="Drinking Station" component={DrinkingStation} />
      <Drawer.Screen name="Washrooms" component={Washrooms} />
      <Drawer.Screen name="Feedback" component={Feedback} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
