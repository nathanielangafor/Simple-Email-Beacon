// File imports
// const database = require('./database'); // Database functions

// Settings for creating web client
const express = require('express');
const app = express();
const expressip = require('express-ip');
const port = 3000

// Other useful settings
const crypto = require('crypto');

app.use(expressip().getIpInfoMiddleware);

app.get('/generateHash', (req, res) => {
  // Generate hash with client IP address and UNIX time
  var hash = crypto.randomUUID(); // Make time more accurate by including hour/minute

  // Append data to database
  // database.insertLink(recieverEmailAddress, emailSubject, hash, today);

  // Return embed link
  res.send(`{'success': 'http://127.0.0.1:3000/emailBeacon?hash=${hash}'}`);
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



