const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost', // Type here the host
  user: 'root', // Type here the user
  password: '', // Type here the pass
  database: 'pruebais1',
  multipleStatements: true,
});

module.exports = { db };
