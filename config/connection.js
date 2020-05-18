// Set up MySQL connection.
const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cal_mel@1013',
    database: 'destinations_db',
  });
}

connection.connect();
module.exports = connection;
