const express = require('express');
const noteRoutes = require('./noteroutes.js');

const app = express(); 

app.use('/notes', noteRoutes);

module.exports = app; 