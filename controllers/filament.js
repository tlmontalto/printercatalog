const express = require('express');
const router = express.Router();
const Filament = require('../models/filament.js')

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  };

// Home Redirect
router.get(`/`, isAuthenticated, (req, res) => {
    res.redirect(`/filament`);
  });
  
// Index
router.get(`/filament`, (req, res) => {
    Filament.find({}, (error, allFilament) => {
    res.render('index.ejs', {
        filaments: allFilament,
        currentUser: req.session.currentUser
    });
    });
});

// New Entry Page
router.get(`/filament/new`, (req, res) => {
    res.render(`new.ejs`, {
        currentUser: req.session.currentUser
    });
});

// Create
router.post(`/filament`, (req, res) => {
    Filament.create(req.body, (error, createdFilament) => {
        if (error) {
            res.send(error);
        } else {
            res.redirect(`/filament`);
        }
    });
});

// Display Page
router.get(`/filament/:id`, (req, res) => {
    Filament.findById(req.params.id, (error, showFilament) => {
        res.render('show.ejs', {
            filament: showFilament,
            currentUser: req.session.currentUser
        });
    });
});

// Edit
router.get(`/filament/:id/edit`, (req, res) => {
    Filament.findById(req.params.id, (error, foundFilament) => {
    res.render('edit.ejs', {
        filament: foundFilament,
        currentUser: req.session.currentUser
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