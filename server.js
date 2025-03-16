const express = require('express');
const path = require('path');
const { connectDB, getDB } = require('./db');

const app = express();
const port = 3000;

// middleware to parse url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
connectDB().then(() => {

    // serve static files & index.html
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', async (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    /* ------------------------------ sign up stuff ----------------------------- */

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
                // insert into users db
                await db.collection('users').insertOne({ 
                    'username': username, 
                    'password': password,
                    'creationDateTime': new Date(),
                    'recentLoginDateTime': new Date()
                });

                await db.collection('data').insertOne({
                    'username': username,
                    'wins': 0,
                    'friends': []
                });

                res.status(201).json({ message: 'Account created!' });
                console.log('Account created!');
            }
        } catch (err) {
            res.status(500).send('Internal server error.');
            console.error(err);
        }
    });

    /* ------------------------------- login stuff ------------------------------ */

    app.post('/login', async (req, res) => {
        const db = getDB();
        const { username, password } = req.body;
        console.log(`Username: ${username}, Password: ${password}`);

        try {
            let user = await db.collection('users').findOne({ 'username': username });
            let pass = await db.collection('users').findOne({ 'password': password});
        
            if (user && pass) {
                res.status(200).json({ message: `Welcome back, @${username}!`});

                await db.collection('users').updateOne( // update most recent login
                    { 'username': username },
                    { $set: { 'recentLoginDateTime': new Date() } }
                );

                console.log('Logged in successfully.')
                // retrieve data

            } else if (user && !pass) {
                res.status(400).json({ message: 'ⓘ Your password is incorrect, please try again.' });
            } else {
                res.status(400).json({ message: 'ⓘ There is no account associated with this username, try creating one instead.' });
            }
        } catch (err) {
            res.status(500).send('Internal server error.')
            console.error(err);
        }
    });

    /* ------------------------------ delete account stuff ----------------------------- */

    app.post('/delete', async (req, res) => {
        const db = getDB();
        const { username } = req.body;
    
        try {
            await db.collection('users').deleteOne({ 'username': username });
            await db.collection('data').deleteOne({ 'username': username });
            res.status(200).json({ success: true });
            console.log('Account deleted.');
        } catch (err) {
            res.status(500).json({ success: false });
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