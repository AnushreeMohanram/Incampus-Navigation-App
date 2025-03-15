const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('myNewDatabase');
        const collection = database.collection('myCollection');

        // Example: Insert a document
        const result = await collection.insertOne({ name: "Jane", age: 25 });
        console.log(`New document inserted with _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
