const mysql = require('mysql');

const { promisify } = require('util');

// Requiere connection a la base de datos
const { database } = require('./keys.js');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('database connection was close');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('database has to many connection');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('database connection was refused');
    }
  }

  if(connection) connection.release();
  console.log('       DATABASE IS CONNECTED');
  return;
});


//
pool.query = promisify(pool.query);

module.exports = pool;
