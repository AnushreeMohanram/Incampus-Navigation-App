const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string (update with your credentials)
const mongoURI = 'mongodb+srv://MAHIMA:MAHIMA@mahima.q3jx0.mongodb.net/?retryWrites=true&w=majority&appName=MAHIMA';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create User Model
const User = mongoose.model('User', UserSchema);

// POST route to add a new user
app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create and save the new user
  const newUser = new User({ username, password });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
