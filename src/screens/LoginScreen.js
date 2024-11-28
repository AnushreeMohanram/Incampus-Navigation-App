import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    if (role === 'Student/Faculty') {
      navigation.navigate('StudentOrFacultyScreen');
    } else {
      navigation.navigate('ParentOrVisitorScreen');
    }
  };

  return (
    <View style={styles.container}>
      {/* TCE Icon */}
      <Image
        source={require('../../assets/tce.png')} 
        style={styles.icon}
      />

      {/* Header */}
      <Text style={styles.header}>Who are you?</Text>

      {/* Role selection buttons */}
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('Student/Faculty')}>
        <Text style={styles.buttonText}>TCE Student / Faculty</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('parent')}>
        <Text style={styles.buttonText}>Parent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('visitor')}>
        <Text style={styles.buttonText}>Visitor</Text>
      </TouchableOpacity>
    </View>
  );
};

const handleSuccessfulLogin = () => {
  // After role selection, navigate to the Drawer Navigation
  navigation.navigate('HomeScreen');
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { width: 100, height: 100, marginBottom: 20 }, // Adjust the size as per your preference
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default LoginScreen;
