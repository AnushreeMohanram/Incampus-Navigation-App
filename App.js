
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'; 
import { View, Text } from 'react-native'; 
import * as FileSystem from 'expo-file-system'; // Import expo-file-system to create the directory
import * as Notifications from 'expo-notifications'; // Import expo-notifications

import DrawerNavigation from './src/navigation/DrawerNavigation'; // Correct path
import React, { useState } from 'react';


import LoginScreen from './src/screens/LoginScreen';
import StudentOrFacultyScreen from './src/screens/StudentOrFacultyScreen';
import ParentOrVisitorScreen from './src/screens/ParentOrVisitorScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import DepartmentDetails from './src/screens/DepartmentDetails';
import TurnByTurnNotification from './src/screens/TurnByTurnNotification'; // Import TurnByTurnNotification screen
import WashroomScreen from './src/screens/WashroomScreen';
import FemaleWashroomScreen from './src/screens/FemaleWashroomScreen';
import MaleWashroomScreen from './src/screens/MaleWashroomScreen';
import WashroomDetailsScreen from './src/screens/WashroomDetailsScreen';
import LocationNotifications from './src/screens/LocationNotifications';
import Favorites from './src/screens/Favorites';

const Stack = createStackNavigator();

// Define the path where map tiles will be saved
const tileDirectory = FileSystem.documentDirectory + 'tiles/';

const createTileFolder = async () => {
  try {
    // Create the directory to store map tiles
    await FileSystem.makeDirectoryAsync(tileDirectory, { intermediates: true });
    console.log('Tile folder created!');
  } catch (e) {
    console.log('Tile folder already exists or failed to create');
  }
};

const App = () => {
  useEffect(() => {
    // Call the function to create the tile folder when the app is loaded
    createTileFolder();

    // Set up notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Request permission for notifications (optional, but recommended for background notifications)
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted!');
      }
    };

    requestNotificationPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentOrFacultyScreen" component={StudentOrFacultyScreen} />
        <Stack.Screen name="ParentOrVisitorScreen" component={ParentOrVisitorScreen} />

        {/* Home Drawer Navigation */}
        <Stack.Screen 
          name="HomeDrawer" 
          component={DrawerNavigation} 
          options={{ headerShown: false }} // Hide header for drawer
        />

        {/* Washroom Screen */}
        <Stack.Screen 
          name="WashroomScreen" 
          component={WashroomScreen} 
          options={{ title: 'Washroom Selection' }} 
        />

        {/* Washroom screens for female and male washrooms */}
        <Stack.Screen name="FemaleWashroom" component={FemaleWashroomScreen} options={{ title: 'Female Washrooms' }} />
        <Stack.Screen name="MaleWashroom" component={MaleWashroomScreen} options={{ title: 'Male Washrooms' }} />

        {/* Washroom Details Screen */}
        <Stack.Screen name="WashroomDetails" component={WashroomDetailsScreen} options={{ title: 'Washroom Details' }} />

        {/* Other Stack Screens */}
        <Stack.Screen name="CampusMap" component={CampusMapScreen} options={{ title: 'Campus Map' }} />
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details' }} />

        {/* Turn-by-Turn Notification Screen */}
        <Stack.Screen 
          name="TurnByTurnNotification" 
          component={TurnByTurnNotification} 
          options={{ title: 'Turn-by-Turn Notifications' }} 
        />

        <Stack.Screen name="Favorites">
          {(props) => <Favorites {...props} recentlyVisited={recentlyVisited} />}
        </Stack.Screen>
        <Stack.Screen name="HomeDrawer" component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="CampusMap">
          {(props) => (
            <CampusMapScreen {...props} addVisitedLocation={addVisitedLocation} />
          )}
        </Stack.Screen>
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
        <Stack.Screen name="LocationNotifications" component={LocationNotifications} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
