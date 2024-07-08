const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost', // Type here the host
  user: 'root', // Type here the user
  password: '1004924374', // Type here the pass
  database: 'pruebais1',
  multipleStatements: true,
});

module.exports = { db };
