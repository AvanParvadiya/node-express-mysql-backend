//db.js is for connection with mysql database
const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//Create a connection with database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

//open the MySQL Connection

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database ");
});

module.exports = connection;
