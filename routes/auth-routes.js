const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User = require('../models/user-model');
/*
firstName: String,
lastName: String,
username: String,
email: String,
googleID: String,
password: String,
phone: Number,
type: String, //role: worker OR client
company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
birthday: Date,
photo: String, //cloudinary
photoName: String
*/

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
	const lastName = req.body.lastName;
    const email = req.body.email;
    //const googleID = req.body.googleID;
    const password = req.body.password;
    const photo = "https://res.cloudinary.com/dohdiqnba/image/upload/v1589745964/Profile%20Image/img_avatar2_jz0i0o.png";

    if (
        !firstName || 
        !lastName || 
        !email || 
        !password || 
        !username
    ) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }

    User.findOne({ username }, (err, foundUser) => {
        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }
        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const aNewUser = new User({
            username:username,
            password: hashPass,
            firstName,
            lastName,
            email,
            photo
        });
        
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});

authRoutes.post('/login', (req, res, next) => {
    // changing to email and password new local strategy
    //http://www.passportjs.org/docs/configure/
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
      if (!theUser) {
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          return;
      }
      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(200).json({});
});

module.exports = authRoutes;