const express = require('express');
const router = express.Router();
const Filament = require('../models/filament.js')

// Home Redirect
router.get(`/`, (req, res) => {
    res.redirect(`/filament`);
  });
  
// Index
router.get(`/filament`, (req, res) => {
    Filament.find({}, (error, allFilament) => {
    res.render('index.ejs', {
        filaments: allFilament
    });
    });
});

// New Entry Page
router.get(`/filament/new`, (req, res) => {
    res.render(`new.ejs`);
});

// Create
router.post(`/filament`, (req, res) => {
    Filament.create(req.body, (error, createdFilament) => {
        res.redirect('/filament');
    });
});

// Display Page
router.get(`/filament/:id`, (req, res) => {
    Filament.findById(req.params.id, (error, showFilament) => {
        res.render('show.ejs', {
        filament: showFilament
        });
    });
});

// Edit
router.get(`/filament/:id/edit`, (req, res) => {
    Filament.findById(req.params.id, (error, foundFilament) => {
    res.render('edit.ejs', {
        filament: foundFilament
    });
    });
});

// Put Edits
router.put(`/filament/:id`, (req, res) => {
    Filament.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedFilament) => {
        res.redirect(`/filament/${req.params.id}`);
})});

// Delete
router.delete('/filament/:id', (req, res) => {
    Filament.findByIdAndRemove(req.params.id, (error, foundFilament) => {
    res.redirect('/filament');
    });
});

module.exports = router;