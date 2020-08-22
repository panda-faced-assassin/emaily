const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google', 
    passport.authenticate('google', {
    scope: ['profile', 'email'] // internal identifiers to specify what data we want to access from Google.
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};