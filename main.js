// File imports
const utilities = require('./utilities'); // Utility functions
// const database = require('./database'); // Database functions

// Module for creating web client
const express = require('express');
const app = express();
const expressip = require('express-ip');
const port = 3000

app.use(expressip().getIpInfoMiddleware);

app.get('/generateHash', (req, res) => {
  // Confirms the perameters recieverEmailAddress is present
  if (req.query.recieverEmailAddress != undefined && req.query.recieverEmailAddress != '') {
    // Confirms the perameters emailSubject is present
    if (req.query.emailSubject != undefined && req.query.emailSubject != '') {
      
      // Get hash generation data from request form
      var recieverEmailAddress = req.query.recieverEmailAddress;
      var emailSubject = req.query.emailSubject;
      var today = new Date().toISOString().slice(0, 10);
      var hash = utilities.generateSha256(recieverEmailAddress + ':' + emailSubject + ':' + today); // Make time more accurate by including hour/minute

      // Append data to database
      // database.insertLink(recieverEmailAddress, emailSubject, hash, today);

      // Return embed link
      res.send(`{'success': 'http://127.0.0.1:3000/emailBeacon?hash=${hash}'}`);
    } else {
      res.send("{'error': 'Please add the emailSubject perameter.'}");
    }
  } else {
    res.send("{'error': 'Please add the recieverEmailAddress perameter.'}");
  }
});

app.get('/emailBeacon', (req, res) => {
  // Confirms the perameters hash is present
  if (req.query.hash != undefined && req.query.hash != '') {
    // Update database to mark email as read using hash input
    database.update('trackingLinks', 'status', 'read', 'hash', req.query.hash)

    // Render image
    res.sendFile('/Users/fnln/Desktop/Email Beacon/ket.jpeg');
  } else {
    res.send("{'error': 'Please add the hash perameter.'}");
  }
});

app.get('/', (req, res) => {
  console.log(req.ipInfo);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


