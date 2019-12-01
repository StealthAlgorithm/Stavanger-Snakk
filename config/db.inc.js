//database login
const mysql = require("mysql2/promise");
module.exports = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "",
  database: "StavangerSnakk",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
