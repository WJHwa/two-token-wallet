const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
