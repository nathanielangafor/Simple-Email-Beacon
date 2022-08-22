const sqlite3 = require("sqlite3").verbose();
const utilities = require('./utilities'); // Utility functions

//connect to the database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

function createLinksTable() {
  // Create the initial table to store tracking links and their status
  db.run('CREATE TABLE trackingLinks (id INTEGER PRIMARY KEY, name TEXT, timeSent TEXT, timeFirstRead TEXT, loggedIPAddresses TEXT, cordinates TEXT, emailUUID text, status TEXT)');
}

function insertLink(name, emailUUID, timeSent, timeFirstRead) {
  // status, loggedIPAddresses and cordinates will be set on the first get request
  var status = 'unread';
  var loggedIPAddresses = '';
  var cordinates = '';

  db.run('INSERT INTO trackingLinks (name, timeSent, timeFirstRead, loggedIPAddresses, cordinates, emailUUID, status) VALUES (?,?,?,?,?,?,?)', [name, timeSent, timeFirstRead, loggedIPAddresses, cordinates, emailUUID, status], (err) => {
      if (err) return console.error(err.message);
  });
}

function read(tableName){
  // Returns all the data in a given table
  db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if(err) return console.error(err.message);
          console.log(rows);
  });
} 

function deleteData(tableName, columnName, columnValue){
  // Deletes given data from a table using the value from one of its columns
  db.run(`DELETE FROM ${tableName} WHERE ${columnName}=?`, columnValue, err =>{
      if(err) return console.log(err.message);
  });
}

function update(tableName, columnName1, columnValue1, columnName2, columnValue2) {
  // Updates a given location in the data table based on inputed data
    db.run(`UPDATE ${tableName} SET ${columnName1}=? WHERE ${columnName2}=?`, [columnValue1, columnValue2], function(err,rows){
  });
}
