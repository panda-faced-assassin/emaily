const express = require('express');
const app = express();

// create route handler
app.get('/', (req, res) => { // specifies type of request
  res.send({hi: 'there'});  // send a response to user containing JSON data
});

// dynamically create port 
const PORT = process.env.PORT || 5000  // PORT capitalized to tell engineers this variable should not be changed lightly. Sets up environment variable provided by Heroku (when in prod) OR uses defailt port value (when in dev).  
app.listen(PORT); // instructs Express to tell Node to listen for incoming traffic on port 5000