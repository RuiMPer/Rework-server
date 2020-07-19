const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// require the user model !!!!
const User = require('../models/user-model');


// firstName: String,
// lastName: String,
// username: String,
// email: String,
// googleID: String,
// password: String,
// phone: Number,
// type: String, //role: worker OR client OR admin
// company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
// birthday: Date,
// photo: String, //cloudinary
// photoName: String

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

  console.log("THIS IS REQ BODY FOR PHOTOPATH", req.body.photoPath)

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
  )
    .then(user => {
      console.log(user)
      // return User.findByIdAndUpdate(user._id, { $push: { photoPath: photoPath } })
      // .then(data => {
      //   console.log(data)
      //   res.json(data);
    }).catch((error) => {
      console.log(error);
    })
});




module.exports = router;
