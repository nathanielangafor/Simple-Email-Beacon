// File imports
const database = require('./database'); // Database functions

// Imports for Express web client
const express = require('express');
const expressip = require('express-ip');

// Other useful imports
const crypto = require('crypto');
const { lookup } = require('geoip-lite');

// Settings to initilize Express web client
const app = express();
const port = 3000
app.use(expressip().getIpInfoMiddleware);


// Generates JSON data of a valid tracking link
app.get('/generateUUID', (req, res) => {
  // Generate UUID
  var UUID = crypto.randomUUID(); // Make time more accurate by including hour/minute
  // Append data to database
  database.insertLink('', UUID, Date.now(), 'null');
  // Return embed link
  res.send(`{'success': 'http://127.0.0.1:3000/emailBeacon?UUID=${UUID}'}`);
});


// Marks a given email as read using its UUID identifier
app.get('/emailBeacon', (req, res) => {
  // Confirms the perameters UUID is present
  if (req.query.UUID != undefined && req.query.UUID != '') {
    // Get trackingLinks data table
    var data = database.read('trackingLinks');

    // Update database to mark email as read using UUID input
    database.update('trackingLinks', 'status', 'read', 'UUID', req.query.UUID)
    // Isolate the data entry with the UUID input from the client server
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == req.query.UUID) {
        var loggedIPAddresses = data[i][3];
        var cordinates = data[i][4];
      }
    }
    // Update IP addresses that have visited an email
    database.update('trackingLinks', 'loggedIPAddresses', loggedIPAddresses + ':' + req.socket.remoteAddress, 'UUID', req.query.UUID)
    database.update('trackingLinks', 'cordinates', cordinates + ':' + String(lookup(loggedIPAddresses)['ll']), 'UUID', req.query.UUID)
    
    // Render image
    res.sendFile('/Users/fnln/Desktop/Email Beacon/ket.jpeg');
  } else {
    res.send("{'error': 'Please add the UUID perameter.'}");
  }
});


// Get the status of a beacon
app.get('/emailBeaconStatus', (req, res) => {
  // Confirms the perameters UUID is present
  if (req.query.UUID != undefined && req.query.UUID != '') {
    // Get trackingLinks data table
    var data = database.read('trackingLinks');
    var result = 'unread'
    // Isolate the data entry with the UUID input from the client server
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] == req.query.UUID) {
        result = 'read'; 
      }
    }
    // Return the result of the beacon
    res.send(result)
  } else {
    res.send("{'error': 'Please add the UUID perameter.'}");
  }
});


app.get('/', (req, res) => {
  console.log(req.ipInfo);
  res.send('You should not be seeing this right now!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




