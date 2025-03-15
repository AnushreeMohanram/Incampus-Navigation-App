const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";

app.use(bodyParser.json());

// Add a route to handle GET requests
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/submit-feedback', async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).send('Rating and comment are required');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('feedbackDatabase');
    const collection = database.collection('feedbacks');
    const feedback = { rating, comment, date: new Date() };
    await collection.insertOne(feedback);
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error('Error saving feedback to MongoDB', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
