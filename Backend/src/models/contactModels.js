// Importing Mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Defining the structure of the contact data using a Mongoose schema
const contactSchema = new mongoose.Schema({
    // Fields for the contact information
    first: String,
    last: String,
    twitter: String,
    avatarUrl: String,
    notes: String,
});

// Creating a Mongoose model named 'Contact' based on the defined schema
const Contact = mongoose.model('Contact', contactSchema);

// Exporting the Contact model for use in other files
module.exports = Contact;
