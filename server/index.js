const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feedbackDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Feedback schema and model
const feedbackSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.post('/feedback', async (req, res) => {
  const { rating, comment } = req.body;
  const newFeedback = new Feedback({ rating, comment });

  try {
    await newFeedback.save();
    res.status(201).send('Feedback submitted');
  } catch (error) {
    res.status(500).send('Error submitting feedback');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
