const { MongoClient } = require('mongodb');

const url = "mongodb+srv://sofiamikaelafrancisco:<db_password>@bingo.7hwen.mongodb.net/?retryWrites=true&w=majority&appName=Bingo";
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('bingo'); // Replace with your database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = { connectDB, getDB };