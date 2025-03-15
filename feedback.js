const { MongoClient } = require('mongodb');

async function submitFeedback(feedback) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('myNewDatabase');
        const collection = database.collection('feedback');

        // Insert feedback document
        const result = await collection.insertOne(feedback);
        console.log(`Feedback submitted with _id: ${result.insertedId}`);
    } catch (error) {
        console.error("Failed to submit feedback:", error.message);
        console.error("Error details:", error);
    } finally {
        await client.close();
    }
}

const feedback = {
    user: "John Doe",
    message: "Great app!",
    rating: 5,
    date: new Date()
};

submitFeedback(feedback).catch(console.error);
