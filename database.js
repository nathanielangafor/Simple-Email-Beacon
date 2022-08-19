const sqlite3 = require("sqlite3").verbose();
const utilities = require('./utilities'); // Utility functions

//connect to the database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

function createLinksTable() {
  // Create the initial table to store tracking links and their status
  db.run('CREATE TABLE trackingLinks (id INTEGER PRIMARY KEY, recieverEmailAddress TEXT, emailSubject TEXT, timeSent TEXT, emailHash text, status TEXT)');
}

function insertLink(recieverEmailAddress, emailSubject) {
  // Gets today's date
  var today = new Date().toISOString().slice(0, 10);
  // Generates a hash with all the relevant details
  // Make time more accurate by including hour/minute for the purpose of scalability
  var emailHash = utilities.generateSha256(recieverEmailAddress + ':' + emailSubject + ':' + today);
  // Status will always be unread until edited by web client
  var status = 'unread';

  db.run('INSERT INTO trackingLinks (recieverEmailAddress, emailSubject, timeSent, emailHash, status) VALUES (?,?,?,?,?)', [recieverEmailAddress, emailSubject, today, emailHash, status], (err) => {
      if (err) return console.error(err.message);
  });
}

function read(tableName){
  // Returns all the data in a given table
  db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if(err) return console.error(err.message);
          return rows;
  });
} 

function deleteData(tableName, columnName, columnValue){
  // Deletes given data from a table using the value from one of its columns
  db.run(`DELETE FROM ${tableName} WHERE ${columnName}=?`, columnValue, err =>{
      if(err) return console.log(err.message);
      console.log(`Item ${columnValue} in column ${columnName} deleted successfully...`);
  });
}

function update(tableName, columnName1, columnValue1, columnName2, columnValue2) {
  // Updates a given location in the data table based on inputed data
  db.run(`UPDATE ${tableName} SET ${columnName1}=? WHERE ${columnName2}=?`, [columnValue1, columnValue2], function(err,rows){
  });
}
