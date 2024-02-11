// Load environment variables from a .env file
require('dotenv').config();

// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing the contact router from the defined route file
const contact_router = require('./routes/contactRoutes');

// Creating an instance of Express
const app = express();

// Setting up the port to either use the environment variable or fallback to 3000
const port = process.env.PORT || 3000;

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Using the contact_router for handling routes
app.use(contact_router);
console.log('Contact routes loaded successfully.');

// Adding a default route for "GET /"
app.get('/', (req, res) => {
  res.send('Welcome to your app!');
});

// Setting up MongoDB connection using the provided URI or a fallback connection string
const mongoURI = process.env.MONGODB_URI || 'fallback_connection_string';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Getting the MongoDB connection instance
const db = mongoose.connection;

// Handling MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Executing code once the MongoDB connection is open
db.once('open', function() {
  // You can add any initialization logic here
});

// Starting the server and listening on the specified port
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
