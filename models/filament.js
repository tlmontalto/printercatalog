const mongoose = require('mongoose');

const filamentSchema = new mongoose.Schema({
  type: { type: String, required: true},
  brand: { type: String, required: true},
  color: { type: String, required: true},
  img: { type: String, required: false},
  stock: { type: String, required: true},
  temperature: { type: String, required: false},
  speed: { type: String, required: false},
  link: { type: String, required: false}
});

const Filament = mongoose.model('Filament', filamentSchema)

module.exports = Filament;