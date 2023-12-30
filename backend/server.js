require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const WeatherData = require('./model/weathermodel'); // Import your Mongoose model
const connectDB = require('./config/db');
const cors = require('cors');
app.use(bodyParser.json());
const path=require('path');

// Set up MongoDB connection

connectDB();
app.use(cors());
const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'client', 'dist', 'index.html'));
})

// Create an API endpoint to save weather data
app.post('/saveWeatherData', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    // Create a new WeatherData instance and save it to the database
    const newWeatherData = new WeatherData(req.body);
    await newWeatherData.save();
    res.status(200).json({ message: 'Weather data saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving weather data.' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
