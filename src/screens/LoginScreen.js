import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    if (role === 'TCEian') {
      navigation.navigate('StudentOrFacultyScreen', { role });
    } else {
      navigation.navigate('ParentOrVisitorScreen', { role });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Who are you?</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRoleSelection('TCEian')}>
        <Text style={styles.buttonText}>TCEian</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default LoginScreen;
