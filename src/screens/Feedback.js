// screens/Feedback.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Feedback = () => {
  const [rating, setRating] = useState(null); // To track rating
  const [comment, setComment] = useState(''); // To track comment

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (!rating || !comment) {
      Alert.alert('Error', 'Please provide both a rating and a comment.');
    } else {
      // Simulate sending feedback (you can integrate API or database later)
      Alert.alert('Feedback Submitted', `Rating: ${rating}\nComment: ${comment}`);
      // Reset after submission
      setRating(null);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Screen</Text>
      <Text style={styles.subtitle}>Rate our app</Text>

      {/* Rating buttons */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <Button
            key={rate}
            title={`${rate} ★`}
            onPress={() => handleRating(rate)}
            color={rating === rate ? 'green' : 'gray'} // Highlight selected rating
          />
        ))}
      </View>

      <Text style={styles.subtitle}>Leave a comment</Text>

      {/* Text input for comments */}
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback here"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Submit button */}
      <Button title="Submit Feedback" onPress={handleSubmit} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green background color
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default Feedback;