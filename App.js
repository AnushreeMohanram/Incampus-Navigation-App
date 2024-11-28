import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';  // Ensure gesture handling is enabled

import LoginScreen from './src/screens/LoginScreen';
import StudentOrFacultyScreen from './src/screens/StudentOrFacultyScreen';
import ParentOrVisitorScreen from './src/screens/ParentOrVisitorScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import LocationNotifications from './src/screens/LocationNotifications'; // Import as required
import DrawerNavigation from './src/navigation/DrawerNavigation'; // Your Drawer component
import DepartmentDetails from './src/screens/DepartmentDetails';

const Drawer = createDrawerNavigator();

const App = () => {
  const colorScheme = useColorScheme(); // Automatically detect the system theme
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark'); // Initialize dark mode state based on system settings

  // Automatically update the theme when system preferences change
  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]); // Dependency on colorScheme to detect system preference changes

  // Choose theme based on dark mode state
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: true,
            drawerStyle: {
              backgroundColor: isDarkMode ? '#333' : '#fff', // Dark mode drawer color
            },
            drawerActiveTintColor: isDarkMode ? '#fff' : '#6200ea', // Active item color
            drawerInactiveTintColor: isDarkMode ? '#bbb' : '#333', // Inactive item color
          }}
        >
          {/* Drawer Screens */}
          <Drawer.Screen name="HomeDrawer" component={DrawerNavigation} options={{ headerShown: false }} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="StudentOrFacultyScreen" component={StudentOrFacultyScreen} />
          <Drawer.Screen name="ParentOrVisitorScreen" component={ParentOrVisitorScreen} />
          <Drawer.Screen name="CampusMap" component={CampusMapScreen} options={{ title: 'Campus Map' }} />
          <Drawer.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details' }} />
          <Drawer.Screen name="LocationNotifications" component={LocationNotifications} options={{ title: 'Location Notifications' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;