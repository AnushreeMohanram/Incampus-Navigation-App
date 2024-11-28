// src/screens/Settings.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerText}>Dark Mode</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode} // Update dark mode on toggle
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Settings;
