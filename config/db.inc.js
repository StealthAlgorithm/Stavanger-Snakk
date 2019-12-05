//database login
const mysql = require("mysql2/promise");
module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rupasql",
  database: "StavangerSnakk",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
