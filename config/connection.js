// Set up MySQL connection.
const mysql = require('mysql');

/* if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {*/
const connection = mysql.createConnection({
  host: 'qn66usrj1lwdk1cc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'ygn20zzf979q538m',
  password: 'm8j3oebonmtvoke2',
  database: 'r59dc9r6wkaytxce'});
// }

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
module.exports = connection;
