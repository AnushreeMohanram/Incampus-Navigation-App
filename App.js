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
import DrinkingStation from './src/screens/DrinkingStation'; // Import the DrinkingStation screen
import MaleWashroomScreen from './src/screens/MaleWashroomScreen';
import FemaleWashroomScreen from './src/screens/FemaleWashroomScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentOrFacultyScreen" component={StudentOrFacultyScreen} />
        <Stack.Screen name="ParentOrVisitorScreen" component={ParentOrVisitorScreen} />
        <Stack.Screen name="HomeDrawer" component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="CampusMap" component={CampusMapScreen} options={{ title: 'Campus Map' }} />
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details' }} />
        <Stack.Screen name="DrinkingStation" component={DrinkingStation} options={{ title: 'Drinking Station' }} />
        <Stack.Screen name="MaleWashroom" component={MaleWashroomScreen} options={{ title: 'Male Washroom' }} />
        <Stack.Screen name="FemaleWashroom" component={FemaleWashroomScreen} options={{ title: 'Female Washroom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;