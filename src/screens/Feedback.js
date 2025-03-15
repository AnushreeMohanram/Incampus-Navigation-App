import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Feedback = () => {
  const [rating, setRating] = useState(0); // Default to 0 for no rating
  const [comment, setComment] = useState(''); // Track comments

  const handleRating = (rate) => {
    setRating(rate); // Set selected rating
  };

  const handleSubmit = async () => {
    if (!rating || comment.trim() === '') {
      Alert.alert('Error', 'Please provide both a rating and a comment.');
    } else {
      // Corrected string interpolation inside Alert
      Alert.alert('Feedback Submitted', `Rating: ${rating}\nComment: ${comment}`);
      setRating(0); // Reset rating
      setComment(''); // Clear comment

      // Send feedback to the server
      try {
        const response = await fetch('http://192.168.120.200:3000/submit-feedback', { // Replace <YOUR_IP_ADDRESS> with your development machine's IP address
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, comment }),
        });

        if (response.ok) {
          console.log('Feedback submitted successfully');
        } else {
          console.error('Error submitting feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback', error);
      }
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
            title={`${rate} ★`} // Corrected dynamic title for rating
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
    backgroundColor: '#4CAF50',
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