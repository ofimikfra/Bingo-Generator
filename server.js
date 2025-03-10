const express = require('express');
const path = require('path');
const { connectDB, getDB } = require('./db');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
connectDB().then(() => {

    // serve static files & index.html
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', async (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // sign up stuff
    app.post('/signup', async (req, res) => {
        const db = getDB();
        const { username, password } = req.body;
        console.log(`Username: ${username}, Password: ${password}`);

        try {
            let user = await db.collection('users').findOne({ 'username': username });
        
            if (user) {
                if (user.password === password) {
                    res.status(400).json({ message: 'ⓘ This account already exists, please login instead.' });
                } else {
                    res.status(400).json({ message: 'ⓘ An account with this username already exists.' });
                }
            } else {
                await db.collection('users').insertOne({ 'username': username, 'password': password });
                res.status(201).json({ message: 'Account created!' });
                console.log('Account created!');
            }
        } catch (err) {
            res.status(500).send('Internal server error.')
            console.error(err);
        }
    });

    // host
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
    
}).catch(err => {
    console.error('Failed to connect to MongoDB', err); // error
});