const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/service-model');
const Booking = require('../models/booking-model');

//API Calendar + model bookings
//worker fazer marcações + client tb !!!!!!
//worker PODE criar cliente


  /*
  title: String,
  description: String,
  date: Date,
  time: String,
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  confirmationStatus: Boolean, //autorização por parte do worker "true/false"
  logStatus: String, //pago, presença do cliente, atraso do cliente -> SEPARAR?
  rating: Number //https://reviewapi3.docs.apiary.io/#reference/0/review-api
*/

// GET route => to retrieve a specific route
router.get('/bookings/:id', (req, res) => {
  Booking.findById(req.params.id)
    .then(Booking => {
      res.json(Booking)
    })
});


// POST route => to create a new Booking
router.post('/bookings', (req, res) => {
  Booking.create({
    title: req.body.title,
    description: req.body.description,
    service: req.body.Service
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
