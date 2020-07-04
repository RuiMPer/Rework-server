const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const passport   = require('passport');


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
  let userId= req.params.userId
    //theUser = req;
    console.log(userId);

    User.findById(userId)
    .then((theUser) => {
      console.log(theUser);
      res.json(theUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

//GET user edit route
router.get("/profile/:userId/edit", (req, res) => {
  let userId= req.params.userId;
  
	User.findById(userId)
		.then((theUser) => {
      console.log(theUser);
      res.json(theUser);
		})
		.catch((error) => {
			console.log(error);
		});
});

//POST user edit post
router.post("/profile/:userId/edit", (req, res) => {
  let userId= req.params.userId;
  
	const { 
    firstName,
    lastName,
    username,
    email,
    password,
    company,
    phone,
    type,
    birthday
  } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    { $set: { 
        firstName,
        lastName,
        username,
        email,
        password,
        company,
        phone,
        type,
        birthday 
      } 
    },
    {new: true}
  )
  .then((user) => {
    res.json(user);
  })
  .catch((error) => {
    console.log(error);
  });
});




module.exports = router;
