//henter DB login
const db = require("./config/db.inc");

module.exports = class connect {
  errormsg(variable, setType) {
    console.log("Fault setting " + setType + " value=" + variable);
  }
  setUserID(UserID) {
    if (typeof UserID == "number" && UserID > 0) this.UserID = UserID;
    else this.errormsg(UserID, "UserID");
  }
  setLatLng(lat, lng) {
    if (typeof lat == "number" && lat > 0) this.lat = lat;
    else this.errormsg(lat, "Latitude");
    if (typeof lng == "number" && lng > 0) this.lng = lng;
    else this.errormsg(lng, "longitude");
  }
  setHistory(history) {
    if (history.length > 20 && typeof history == "string")
      this.history = history;
    else this.errormsg(history, "History text");
  }
  async queryread(type) {
    if (typeof type == "number") console.log("a number OK");
    console.log("trying to read data with type " + type);
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
      //prepared statements
      return await db.query(sql);
    } catch (err) {
      console.log(err);
    }
  }
  async querywrite(type) {
    let sql;
    let variables;
    try {
      if (typeof type == "number") console.log("a number OK");
      console.log("trying to insert data with type " + type);
      switch (type) {
        case 0:
          sql =
            "INSERT INTO History(UserID, Longitude, Latitude, History) values(?,?,?,?);";
          variables = [this.UserID, this.lng, this.lat, this.history];
          break;
        default:
          console.log("Feil: sql spørringstype ikke satt");
          break;
      }
      await db.execute(sql, variables, (err, statement) => {
        if (err) throw err;
        statement.close();
      });
    } catch (err) {
      console.log(err);
    }
  }
};
