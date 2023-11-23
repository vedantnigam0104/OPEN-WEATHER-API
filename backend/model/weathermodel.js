const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  humidity: Number,
  feelsLike: Number,
  windSpeed: Number,
  // Add more fields as needed
}, {
  strict: false, // Allow extra fields
});

module.exports = mongoose.model('WeatherData', weatherDataSchema);
