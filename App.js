import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import LoginScreen from './src/screens/LoginScreen';
import StudentOrFacultyScreen from './src/screens/StudentOrFacultyScreen';
import ParentOrVisitorScreen from './src/screens/ParentOrVisitorScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import LocationNotifications from './src/screens/LocationNotifications';
import Favorites from './src/screens/Favorites';

const Stack = createStackNavigator();

const App = () => {
  const [recentlyVisited, setRecentlyVisited] = useState([ { id: '4', name: 'Parking Area', latitude: 9.882762, longitude: 78.080839 },
    { id: '5', name: 'CSE Department', latitude: 9.882886, longitude: 78.083664 },
  ]);

  const addVisitedLocation = (location) => {
    setRecentlyVisited((prev) => {
      const updated = [location, ...prev.filter((loc) => loc !== location)];
      return updated.slice(0, 10); // Limit to the last 10 locations
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentOrFacultyScreen" component={StudentOrFacultyScreen} />
        <Stack.Screen name="ParentOrVisitorScreen" component={ParentOrVisitorScreen} />
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
