import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';  // Make sure to add this import for gesture handling
import DrawerNavigation from './src/navigation/DrawerNavigation'; // Correct path
import LoginScreen from './src/screens/LoginScreen';
import StudentOrFacultyScreen from './src/screens/StudentOrFacultyScreen';
import ParentOrVisitorScreen from './src/screens/ParentOrVisitorScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import LocationNotifications from './src/screens/LocationNotifications'; // Import as required

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Choose Student or Faculty / Parent or Visitor */}
        <Stack.Screen name="StudentOrFacultyScreen" component={StudentOrFacultyScreen} />
        <Stack.Screen name="ParentOrVisitorScreen" component={ParentOrVisitorScreen} />

        {/* Home Drawer Navigation */}
        <Stack.Screen 
          name="HomeDrawer" 
          component={DrawerNavigation} 
          options={{ headerShown: false }} // Hide header for drawer
        />

        {/* Other Stack Screens */}
        <Stack.Screen name="CampusMap" component={CampusMapScreen} options={{ title: 'Campus Map' }} />
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details' }} />
        <Stack.Screen name="LocationNotifications" component={LocationNotifications} options={{ title: 'Location Notifications' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;