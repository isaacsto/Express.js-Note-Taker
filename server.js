// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/index.js')

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);



// GET route that reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST route receives new note to save on request body, adds it to db.json file, assigns it unique id, and returns the new note as JSON
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  
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
