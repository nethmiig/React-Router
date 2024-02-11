// Importing required modules
const express = require("express");
const Contact = require("../models/contactModels.js");
const bodyParser = require("body-parser");

// Creating an instance of the Express router
const contact_router = express();

// Setting up middleware to parse incoming request bodies
contact_router.use(bodyParser.urlencoded({ extended: false }));

// Handling POST requests to "/api/contact"
contact_router.post("/api/contact", async function (req, res) {
    // Extracting data from the request body
    const { first, last, avatarUrl, notes, twitter } = req.body;

    // Creating a new Contact instance with the extracted data
    const contact = new Contact({
        first: first,
        last: last,
        avatarUrl: avatarUrl,
        notes: notes,
        twitter: twitter,
    });

    try {
        // Saving the contact to the database and responding with success message
        await contact.save().then(function (contact) {
            return res.status(200).json({
                success: true,
                message: "Contact saved!",
            });
        });
    } catch (error) {
        // Handling errors and responding with an error message
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// Exporting the contact_router for use in other files
module.exports = contact_router;
