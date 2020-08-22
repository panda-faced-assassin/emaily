const mongoose = require('mongoose'); // import Mongoose.js
const { Schema } = mongoose; // pull the Schema prop of Mongoose object

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema); // create Mongoose model class for the Mongo collection (i.e. table) "users"