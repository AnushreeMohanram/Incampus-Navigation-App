import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DepartmentDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { department } = route.params;

  const handleViewMap = () => {
    navigation.navigate('CampusMap', { searchQuery: department.department });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.departmentName}>{department.department}</Text>
      <Button title="View on Map" onPress={handleViewMap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  departmentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DepartmentDetails;
