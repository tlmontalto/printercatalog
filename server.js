const express = require(`express`);

const app = express();
const PORT = 3000;

// Index
app.get(`/filament`, (req, res) => {
    res.send(`Welcome to the Printer Catalog!`);
});

app.get(`/filament/new`, (req, res) => {
    res.send(`Add new filament here.`);
});

app.get(`/filament/:id`, (req, res) => {
    res.send(`Filament details here.`);
});



// Listen
app.listen(3000, () => {
    console.log(`Listening to port ${PORT}`);
});