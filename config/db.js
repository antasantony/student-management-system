const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Rce18me007",
  database: "student_db"
});

module.exports = db;