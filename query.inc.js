//henter DB login
const db = require("./db.inc");

module.exports = class connect {
  async query(type) {
    console.log("DB Query");
    let sql;
    //valg av sql streng oppgis ved tall
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
