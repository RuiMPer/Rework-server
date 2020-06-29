const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/service-model');
const Booking = require('../models/booking-model');

// GET route => to retrieve a specific route
router.get('/tasks/:id', (req, res) => {
  Booking.findById(req.params.id)
    .then(Booking => {
      res.json(Booking)
    })
});


// POST route => to create a new Booking
router.post('/tasks', (req, res) => {
  Booking.create({
    title: req.body.title,
    description: req.body.description,
    Service: req.body.Service
  })
  .then(response => {
    Service.findByIdAndUpdate(req.body.Service, {
      $push: { tasks: response._id }
    })
    .then((response) => {
      res.json(response);
    })
  })
});

module.exports = router
