const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys');

const User = mongoose.model('users'); // access to User model class. one argument means we're fetching something from model class, two args means loading something into class

passport.use( // passport.use makes aware that there is a new strategy available for auth use. new GoogleStrategy(pass in information on how to to configure authorization) creates new instance of Google strategy
    new GoogleStrategy( // google strategy has an internal identifier 'google' that can be used in the route handler
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', // route user is sent to after they grant auth
      }, 
      (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        User.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
            // we already have a record with the given profile ID
          } else {
            // we don't have a user record with this ID, make a new record
            new User({ googleId: profile.id }).save(); // creates a new instance of a user in our DB. must call "save" function to save it in the database.
          }
        });
      }
    )
  ); 