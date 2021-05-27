const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const PORT = 3000;

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Mongoose Middleware
mongoose.connect(`mongodb://localhost:27017/filament`, { useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
});

// Index
app.get(`/filament`, (req, res) => {
    res.render(`index.ejs`);
});

// New Entry Page
app.get(`/filament/new`, (req, res) => {
    res.send(`Add new filament here.`);
});

// Display Page
app.get(`/filament/:id`, (req, res) => {
    res.send(`Filament details here.`);
});



// Listen
app.listen(3000, () => {
    console.log(`Listening to port ${PORT}`);
});