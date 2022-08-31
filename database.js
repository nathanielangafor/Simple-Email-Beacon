const { exitCode, execPath } = require("process");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

//connect to the database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

function createLinksTable() {
  // Create the initial table to store tracking links and their status
  db.run('CREATE TABLE IF NOT EXISTS trackingLinks (id INTEGER PRIMARY KEY, name TEXT, timeGenerated TEXT, emailUUID TEXT)');
}

function insertLink(name, emailUUID, timeGenerated) {
  db.run('INSERT INTO trackingLinks (name, timeGenerated, emailUUID) VALUES (?,?,?)', [name, timeGenerated, emailUUID], (err) => {
      if (err) return console.error(err.message);
  });
}

function createVisitsTable() {
  // Create the initial table to store tracking links and their status
  db.run('CREATE TABLE IF NOT EXISTS linkVisits (id INTEGER PRIMARY KEY, timeVisited TEXT, loggedIPAddress TEXT, sessionData TEXT, emailUUID TEXT)');
}

function insertVisit(timeVisited, loggedIPAddress, sessionData, emailUUID) {
  db.run('INSERT INTO linkVisits (timeVisited, loggedIPAddress, sessionData, emailUUID) VALUES (?,?,?,?)', [timeVisited, loggedIPAddress, sessionData, emailUUID], (err) => {
      if (err) return console.error(err.message);
  });
}

function readAll(tableName, callback){
  // Returns all the data in a given table
  db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if(err) return console.error(err.message);
      console.log(rows);
      callback(rows);
  });
} 

function readSome(tableName, columnName, columnValue, callback){
  // Returns all the data in a given table
  db.all(`SELECT * FROM ${tableName} WHERE ${columnName}=?`, [columnValue], (err, rows) => {
      if(err) return console.error(err.message);
      console.log(rows);
      callback(rows);
  });
} 

function del(tableName, columnName, columnValue){
  // Deletes given data from a table using the value from one of its columns
  db.run(`DELETE FROM ${tableName} WHERE ${columnName}=?`, columnValue, err =>{
      if(err) return console.log(err.message);
  });
}

function update(tableName, columnName1, columnValue1, columnName2, columnValue2) {
  // Updates a given location in the data table based on inputed information
    db.run(`UPDATE ${tableName} SET ${columnName1}=? WHERE ${columnName2}=?`, [columnValue1, columnValue2], function(err,rows){
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { insertLink, readAll, readSome, del, update, insertVisit, sleep };

const path = "./database.db";

if (fs.existsSync(path)) {
  console.log('database.db file detected...')
  createLinksTable();
  createVisitsTable();
} else {
  console.log('database.db file not detected...')
}
