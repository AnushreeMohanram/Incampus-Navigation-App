import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'; // Make sure to add this import for gesture handling

// Import screens
import DrawerNavigation from './src/navigation/DrawerNavigation'; // Correct path for DrawerNavigation
import LoginScreen from './src/screens/LoginScreen';
import StudentOrFacultyScreen from './src/screens/StudentOrFacultyScreen';
import ParentOrVisitorScreen from './src/screens/ParentOrVisitorScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import LocationNotifications from './src/screens/LocationNotifications';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        
        {/* Choose User Type */}
        <Stack.Screen 
          name="StudentOrFacultyScreen" 
          component={StudentOrFacultyScreen} 
          options={{ title: 'Student/Faculty Selection' }} 
        />
        <Stack.Screen 
          name="ParentOrVisitorScreen" 
          component={ParentOrVisitorScreen} 
          options={{ title: 'Parent/Visitor Selection' }} 
        />

        {/* Home Drawer Navigation */}
        <Stack.Screen 
          name="HomeDrawer" 
          component={DrawerNavigation} 
          options={{ headerShown: false }} // Hide header for drawer screens
        />

        {/* Campus Map and Location Screens */}
        <Stack.Screen 
          name="CampusMap" 
          component={CampusMapScreen} 
          options={{ title: 'Campus Map' }} 
        />
        <Stack.Screen 
          name="LocationDetails" 
          component={LocationDetailsScreen} 
          options={{ title: 'Location Details' }} 
        />
        <Stack.Screen 
          name="LocationNotifications" 
          component={LocationNotifications} 
          options={{ title: 'Location Notifications' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;