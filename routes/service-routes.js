const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/servicemodel');

/*
title: String,
description: String,
category: String, //categoria p/filtro
bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking'}],
author: { type: Schema.Types.ObjectId, ref: 'User'},
photo: [{ type: String }], //cloudinary + multer
photoName: String
*/


// GET route => to get all the Services
router.get('/allservices', (req, res) => {
  // Gets data from mongoDB
  Service.find()
    .then(allServices => {
      // will do something with the result
      res.json(allServices);
    })
    .catch(err => {
      // will do something else
      res.json(err);
    })
});

//GET route => to get user Services
router.get('/services', (req, res) => {
  // Gets data from mongoDB
  Service.find({ author: req.user })
    .then(allServices => {
      // will do something with the result
      res.json(allServices);
    })
    .catch(err => {
      // will do something else
      res.json(err);
    })
});


//POST route => to create a new Service
router.post('/services', (req, res) => {
  const { title, description, category, photoPath, author } = req.body;
  //const {author} = req.session...
  console.log('photopath', photoPath);
  Service.create({
    title,
    description,
    category,
    author
  })
    .then(response => {
      console.log(response)
      return Service.findByIdAndUpdate(response._id, { $push: { photoPath: photoPath } })
        .then(data => {
          console.log(data)
          res.json(data);
        })
    })
    .catch(err => {
      res.json(err);
    })
});


//GET route => get a specific Service using the id
router.get('/services/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'id is not valid' });
    return;
  }

  Service.findById(req.params.id)
    // getting all the bookings for this Service
    .populate('bookings')
    .then(service => {
      res.json(service);
    })
    .catch(error => {
      res.json(error);
    })
});

// PUT route => to update a specific Service
router.put('/services/:id', (req, res) => {
  Service.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      console.log('response', response);
      res.json({ message: `Service ${response} was updated succesfully` });
    })
    .catch(error => {
      res.json(error);
    })
});


// DELETE route => to delete a specific Service
router.delete('/services/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  }

  Service.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json({ message: response })
    })
    .catch(error => {
      res.status(500).json({ message: `Error occurred: ${error}` });
    });
});

module.exports = router;