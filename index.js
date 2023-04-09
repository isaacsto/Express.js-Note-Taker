// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

// GET route that reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST route that receives a new note to save on the request body, adds it to the db.json file, assigns it a unique id, and then returns the new note to the client as JSON
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Start server to begin listening
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
