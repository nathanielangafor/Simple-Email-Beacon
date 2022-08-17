// File imports
const utilities = require('./utilities'); // Utility functions
const database = require('./database'); // Utility functions

// Module for creating web client
const express = require('express');
const app = express();
const expressip = require('express-ip');
const port = 3000

// Useful modules
const prompt = require("prompt-sync")({ sigint: true }); // Allows for user input

app.use(expressip().getIpInfoMiddleware);

// Settings
var recipientEmail = prompt("What is the recipient Email?");
var emailSubject = prompt("What is the emailSubject?");
var today = new Date().toISOString().slice(0, 10);
var emailHash = utilities.generateSha256(recipientEmail + ':' + emailSubject + ':' + today); // Make time more accurate by including hour/minute

console.log('Your generated link embed - http://127.0.0.1:3000/emailBeacon?hash=' + emailHash) // Make this ACTUALLY html 
console.log('\nHow to use:\nPaste this html code at the bottom of your email and monitor your dashboard to know when the email has been read!')

app.get('/emailBeacon', (req, res) => {
  if (req.query.hash != undefined && req.query.hash != '') {
    // Update database to mark email as read using hash input
    console.log('Email with hash -- ' + req.query.hash + ' -- has been read.')
    res.sendFile('/Users/fnln/Desktop/Email Beacon/ket.jpeg');
  } else {
    res.send('invalidHash');
  }
});

app.get('/', (req, res) => {
  console.log(req.ipInfo);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

