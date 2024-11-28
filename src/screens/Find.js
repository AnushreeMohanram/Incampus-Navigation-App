import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const departmentData = [
  { id: 1, department: 'IT Department', classrooms: ['IG1', 'IG2', 'IG3', 'IG4', 'IG5', 'IG6', 'IG7', 'IG8', 'IF1', 'IF2', 'IF3', 'IF4', 'IS1', 'IS2', 'IS3', 'IS4', 'IS5', 'ITT1', 'ITT2', 'ITT3', 'ITT4'], latitude: 9.882570, longitude: 78.083585},
  { id: 2, department: 'CSE Department', classrooms: ['Parallel Processing Lab', 'Unity Multimedia Lab', 'Microsoft Technical Services Lab', 'Artificial Intelligence Lab', 'Software Engineering Lab', 'Multicore Lab', 'Project Lab'], latitude: 9.882886, longitude: 78.083664 },
  { id: 3, department: 'ECE Department', classrooms: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14'], latitude: 9.882978, longitude: 78.082533 },
  { id: 4, department: 'Woman Empowerment Cell', classrooms: ['LR1'], latitude: 9.882047679865266, longitude: 78.08364092299794 },
  { id: 5, department: 'Science Block', classrooms: ['S1', 'S2', 'S3', 'S4'], latitude: 9.881977714735674, longitude: 78.08317317838197 },
  { id: 6, department: 'TCE EIACP PC-RP', classrooms: ['AT1'], latitude: 9.881256, longitude: 78.083662 },
  { id: 7, department: 'B Halls', classrooms: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'], latitude: 9.881859, longitude: 78.082797 }
];


const Find = () => {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedDepartment, setSelectedDepartment] = useState(null); 
  const navigation = useNavigation();

  const handleSearch = () => {
    const foundDepartment = departmentData.find(department =>
      department.classrooms.some(classroom =>
        classroom.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (foundDepartment) {
      setSelectedDepartment(foundDepartment); 
      setModalVisible(true); 
    } else {
      alert('No classrooms found');
    }
  };

  const handleViewMap = () => {
    if (selectedDepartment) {
      navigation.navigate('CampusMap', {
        departmentName: selectedDepartment.department,
        latitude: selectedDepartment.latitude,
        longitude: selectedDepartment.longitude,
      });
      setModalVisible(false); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for classrooms..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedDepartment && (
              <>
                <Text style={styles.modalTitle}>{selectedDepartment.department}</Text>
                <TouchableOpacity style={styles.viewOnMapButton} onPress={handleViewMap}>
                  <Text style={styles.viewOnMapButtonText}>View on Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8f8f8' },
  searchBar: { height: 50, borderColor: '#ddd', borderWidth: 1, marginBottom: 20, paddingLeft: 15, borderRadius: 8, backgroundColor: '#fff', fontSize: 16 },
  searchButton: { backgroundColor: '#007BFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  searchButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { backgroundColor: '#ffffff', padding: 30, borderRadius: 12, width: 280, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  viewOnMapButton: { backgroundColor: '#28a745', paddingVertical: 12, borderRadius: 8, width: '100%', marginBottom: 15, alignItems: 'center' },
  viewOnMapButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  closeButton: { backgroundColor: '#dc3545', paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default Find;
