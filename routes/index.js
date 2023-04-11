const express = require('express');
const noteRoutes = require('./noteroute.js');

const app = express(); 

app.use('/notes', noteRoutes);

module.exports = app; 