import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import Find from '../screens/Find';
import Favorites from '../screens/Favorites';
import OfflineMap from '../screens/OfflineMap';
import DrinkingStation from '../screens/DrinkingStation';
import Washrooms from '../screens/Washrooms';
import Feedback from '../screens/Feedback';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Campus Map" component={CampusMapScreen} />
      <Drawer.Screen name="Search by Classrooms" component={Find} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="Offline Map" component={OfflineMap} />
      <Drawer.Screen name="Drinking Station" component={DrinkingStation} />
      <Drawer.Screen name="Washrooms" component={Washrooms} />
      <Drawer.Screen name="Feedback" component={Feedback} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
