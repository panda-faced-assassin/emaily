const express = require('express');
const mongoose = require('mongoose');
const cookieSeassion = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys');
require('./models/User'); // must define the User model before using it in passport. order of require statements matter
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSeassion({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:  [keys.cookieKey] // make sure it as an error so that we can provide multiple keys for additional security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes') (app);

// dynamically create port 
const PORT = process.env.PORT || 5000  // PORT capitalized to tell engineers this variable should not be changed lightly. Sets up environment variable provided by Heroku (when in prod) OR uses defailt port value (when in dev).  
app.listen(PORT); // instructs Express to tell Node to listen for incoming traffic on port 5000