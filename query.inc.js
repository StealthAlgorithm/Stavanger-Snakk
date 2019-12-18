//henter DB login
const db = require("./config/db.inc");

module.exports = class connect {
  errormsg(variable, setType) {
    console.log("Fault setting " + setType + " value=" + variable);
    this.kjor = true;
  }
  setUserID(UserID) {
    if (typeof UserID == "number" && UserID > 0) this.UserID = UserID;
    else this.errormsg(UserID, "UserID");
  }
  setLatLng(nlat, nlng) {
    let lat = parseFloat(nlat);
    let lng = parseFloat(nlng);
    this.lat = lat;
    this.lng = lng;
  }
  setHistory(history) {
    if (history.length > 20 && typeof history == "string")
      this.history = history;
    else this.errormsg(history, "History text");
  }
  async queryread(type) {
    console.log("________________________________________");
    //  if (typeof type == "number") console.log("a number OK");
    console.log("trying to read data with type " + type);
    let sql;
    //valg av sql streng oppgis ved tall
    try {
      switch (type) {
        case 0:
          sql = "SELECT * FROM History WHERE Active=true;";
          break;
        case 1:
          sql =
            "SELECT * FROM History WHERE Active=false ORDER BY Created DESC;";
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
      //  if (typeof type == "number") console.log("a number OK");
      console.log("****************************************");
      console.log("trying to insert data with type " + type);
      switch (type) {
        case 0:
          sql =
            "INSERT INTO History(UserID, Longitude, Latitude, History, Active) values(?,?,?,?,?);";
          variables = [this.UserID, this.lng, this.lat, this.history, true];
          break;
        default:
          console.log("Feil: sql spørringstype ikke satt");
          break;
      }
      if (!this.kjor)
        db.execute(sql, await variables, (err, statement) => {
          if (err) throw err;
          statement.close();
        });
    } catch (err) {
      console.log(err);
    }
  }
};
