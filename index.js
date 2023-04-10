// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');


// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// GET route that returns the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET route that returns the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



// Start server to begin listening
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
