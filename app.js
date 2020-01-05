const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to databse' + config.database);
});

mongoose.connection.on('error', () => {
    console.log('Database error' + config.database);
});

const app = express();
const users = require('./routes/users');

// Port Number
const port = 3000;

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint!');
});



// Start Server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});