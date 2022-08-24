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
const port = 8080
app.use(expressip().getIpInfoMiddleware);


// Generates JSON data of a valid tracking link
app.get('/generateUUID', (req, res) => {
  // Generate UUID
  var UUID = crypto.randomUUID(); // Make time more accurate by including hour/minute
  // Append data to database
  database.insertLink('', UUID, Date.now());
  // Return embed link
  res.send(`http://127.0.0.1:3000/emailBeacon?UUID=${UUID}`);
});


// Marks a given email as read using its UUID identifier
app.get('/emailBeacon', (req, res) => {
  // Confirms the perameters UUID is present
  if (req.query.UUID != undefined && req.query.UUID != '') {
  // Get the client IP address
    // var ip = req.headers['x-forwarded-for']
    var ip = '73.134.52.248'
    // Insert a visit entry into the db
    database.insertVisit(Date.now(), ip, JSON.stringify(lookup(ip)), req.query.UUID)

    // Render image
    res.sendFile('/Users/appleid/Downloads/Simple-Email-Beacon-main/1x1_image.png');

  } else {
    res.send("Error, please add the UUID perameter.");
  }
});


// Get the status of a beacon
app.get('/emailBeaconStatus', (req, res) => {
  // Confirms the perameters UUID is present
  if (req.query.UUID != undefined && req.query.UUID != '') {
    // fetch all links visits for a given UUID
    database.readSome('linkVisits', 'emailUUID', req.query.UUID, (rows) => {
      var visits = rows;
      // If there are no visits, return Unread... otherwise return list of visits
      if (visits.length == 0) {
        res.send('Unread...')
      } else {
        res.send(visits)
      }
    });
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






