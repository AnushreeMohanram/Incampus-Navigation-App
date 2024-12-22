import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StudentOrFacultyScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Student'); // Always set to 'Student'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleProceed = async () => {
    // Make API call to save the user data (username and password)
    try {
      const response = await fetch('http://192.168.1.5:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Navigate to HomeDrawer screen on success
        navigation.navigate('HomeDrawer');
      } else {
        // Show error message if username already exists or any other error
        alert(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Student' && styles.activeTab]}
          onPress={() => setSelectedTab('Student')}
        >
          <Text style={[styles.tabText, selectedTab === 'Student' && styles.activeTabText]}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Faculty' && styles.activeTab]}
          onPress={() => setSelectedTab('Faculty')}
        >
          <Text style={[styles.tabText, selectedTab === 'Faculty' && styles.activeTabText]}>Faculty</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === 'Student' ? (
          <>
            <Text style={styles.label}>Enter Roll Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Roll Number"
              keyboardType="numeric"
              value={username}
              onChangeText={setUsername}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Faculty Email"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
          </>
        )}

        <Text style={styles.label}>Enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  tab: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 4,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  tabText: {
    fontSize: 18,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: '100%',
    marginBottom: 20,
  },
  proceedButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentOrFacultyScreen;
