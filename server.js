// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const db = mongoose.connection;
const session = require('express-session');

require('dotenv').config()

const PORT = process.env.PORT || 3000;

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'filament';

// Middleware
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
}));

// Mongoose Middleware
mongoose.connect(MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false });
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
});

// Error / Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

const filamentController = require('./controllers/filament.js');
app.use(filamentController);

const userController = require('./controllers/users_controller.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions_controller.js');
app.use('/sessions', sessionsController);

// Listen
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});