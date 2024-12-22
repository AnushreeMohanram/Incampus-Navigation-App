import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const departmentData = [
  { id: 1, department: 'IT Department', classrooms: ['IG1', 'IG2', 'IG3', 'IG4', 'IG5', 'IG6', 'IG7', 'IG8', 'IF1', 'IF2', 'IF3', 'IF4', 'IS1', 'IS2', 'IS3', 'IS4', 'IS5', 'ITT1', 'ITT2', 'ITT3', 'ITT4'], latitude: 9.882570, longitude: 78.083585 },
  { id: 2, department: 'CSE Department', classrooms: ['Parallel Processing Lab', 'Unity Multimedia Lab', 'Microsoft Technical Services Lab', 'Artificial Intelligence Lab', 'Software Engineering Lab', 'Multicore Lab', 'Project Lab'], latitude: 9.882886, longitude: 78.083664 },
  { id: 3, department: 'ECE Department', classrooms: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14'], latitude: 9.882978, longitude: 78.082533 },
  { id: 4, department: 'Woman Empowerment Cell', classrooms: ['LR1'], latitude: 9.882047679865266, longitude: 78.08364092299794 },
  { id: 5, department: 'Science Block', classrooms: ['S1', 'S2', 'S3', 'S4'], latitude: 9.881977714735674, longitude: 78.08317317838197 },
  { id: 6, department: 'TCE EIACP PC-RP', classrooms: ['AT1'], latitude: 9.881256, longitude: 78.083662 },
  { id: 7, department: 'B Halls', classrooms: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'], latitude: 9.881859, longitude: 78.082797 }
];

const Find = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Find Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Find;
