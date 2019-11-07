const db = require("./db.inc");

module.exports = class connect {
  async query(type) {
    console.log("DB Query");
    console.log(type);
    let sql;
    try {
      switch (type) {
        case 0:
          sql = "SELECT * FROM History;";
          break;
        default:
          console.log("Feil: sql spørringstype ikke satt");
          break;
      }

      return await db.query(sql);
    } catch (err) {
      console.log(err);
    }
  }
};
