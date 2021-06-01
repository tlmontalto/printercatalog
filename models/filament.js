const mongoose = require('mongoose');

const filamentSchema = new mongoose.Schema({
  type: { type: String, required: true},
  brand: { type: String, required: true},
  color: { type: String, required: true},
  stock: { type: String, required: true},
  img: { type: String, required: false},
  hotendTemperature: { type: String, required: false},
  bedTemperature: { type: String, required: false},
  retractionDistance: { type: String, required: false},
  retractionSpeed: { type: String, required: false},
  speed: { type: String, required: false},
  link: { type: String, required: false}
});

const Filament = mongoose.model('Filament', filamentSchema)

module.exports = Filament;