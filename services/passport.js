const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys');

const User = mongoose.model('users'); // access to User model class. one argument means we're fetching something from model class, two args means loading something into class

passport.serializeUser((user, done) => { // creates token for relogging
  done(null, user.id); // user ID from Mongo db. Once a user signs in, we only care about our internal IDs.
});

passport.deserializeUser((id, done) => { // translates the token into the user.id
  User.findById(id)
    .then(user => { // remember, anytime you are interacting with MongoDB it is asynchronous and returns a promise
      done(null, user)
    }); 
});

passport.use( // passport.use makes aware that there is a new strategy available for auth use. new GoogleStrategy(pass in information on how to to configure authorization) creates new instance of Google strategy
    new GoogleStrategy( // google strategy has an internal identifier 'google' that can be used in the route handler
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', // route user is sent to after they grant auth
        proxy: true
      }, 
      (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        User.findOne({ googleId: profile.id }).then(existingUser => { // anytime a query is made it is asynchronous and thus we receive a promise (think Cypress)
          if (existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser); // we found the user and are done
          } else {
            // we don't have a user record with this ID, make a new record
            new User({ googleId: profile.id }) // creates a new instance of a user in our DB.
              .save() // must call "save" function to save it in the database. 
              .then(user => done(null, user)); // saving is asynchronous - do not call done without a then statement. null implies that you are not expecting errors (this is for simple processes)
          }
        });
      }
    )
  ); 