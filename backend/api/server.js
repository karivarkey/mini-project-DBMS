// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Toy = require('./models/Toy'); // Import the Toy model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// POST route to add a new toy
app.post('/api/toys', async (req, res) => {
  try {
    const newToy = new Toy(req.body);
    await newToy.save();
    res.status(201).json(newToy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to retrieve all toys
app.get('/api/toys', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;