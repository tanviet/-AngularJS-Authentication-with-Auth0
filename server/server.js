// BASE SETUP
// =============================================================================
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var port = process.env.PORT || 5000;

// Allow app use CORS (Cross-Origin Resource Sharing)
// Front-end and back-end used 2 different IP addresses
app.use(cors());

// The JWT authentication middleware authenticates callers using a JWT
var authCheck = jwt({
  secret: new Buffer('YOUR_AUTH0_SECRET', 'base64'),
  audience: 'YOUR_AUTH0_CLIENT_ID'
});

// ROUTES FOR OUR API
// =============================================================================

// Define our APIs
app.get('/api/public', function(req, res) {
  console.log('come here...');
  res.json({message: "Hello from a public endpoint! You don't need to be authenticated to see this."});
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({message: "Hello from a private endpoint! You DO need to be authenticated to see this."});
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);