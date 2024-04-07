const { MongoClient } = require('mongodb');

// Connection URI from MongoDB Atlas
const uri = 'mongodb+srv://contactbinitbhushan:CzNGPpIg7AQpMIhP@cluster0.hy7vvyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Replace <username>, <password>, <cluster>, and <dbname> with your MongoDB Atlas credentials and database name

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        console.log('Connected to MongoDB Atlas');

        // You can now perform operations on the database
        // For example, you can query data, insert documents, update documents, etc.

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    } finally {
        // Close the connection when you're done
        await client.close();
        console.log('Disconnected from MongoDB Atlas');
    }
}

