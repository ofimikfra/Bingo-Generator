const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://sofiamikaelafrancisco:CsvMA2O6dJvswNPv@bingo.7hwen.mongodb.net/?retryWrites=true&w=majority&appName=Bingo';
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('bingo'); 
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