const express = require('express');
const path = require('path');
const { connectDB } = require('./db');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB().then(() => {
    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    // Serve the index.html file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});