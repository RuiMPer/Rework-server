const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// require the user model !!!!
const User = require('../models/usermodel');

/* GET profile page */
router.get('/profile/:userId', (req, res, next) => {
  let userId = req.params.userId
  //theUser = req;

  User.findById(userId)
    .then((theUser) => {
      console.log('THE USER', theUser)
      res.json(theUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

//POST user edit post
router.post("/profile/:userId", (req, res) => {
  let userId = req.params.userId;
  console.log("userID", userId)

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    company,
    phone,
    type,
    birthday,
    photoPath
  } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        firstName,
        lastName,
        username,
        email,
        password,
        company,
        phone,
        type,
        birthday,
        photoPath
      }
    },
    { new: true }
  ).then(user => {
      console.log(user)

      return User.findByIdAndUpdate(user._id, { $set: { photoPath: photoPath } })
        .then((data) => {
          console.log("DATAAAAA",data)
          res.json(data);

        })
    
    }).catch((error) => {
      console.log(error);
    });
  });




module.exports = router;
