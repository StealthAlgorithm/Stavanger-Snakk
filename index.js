"use strict";
const Connect = require("./query.inc");
const HttpStatus = require("http-status");
const bodyparser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const connect = new Connect();
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

async function loadData(res) {
  let data = await connect.queryread(0);
  //  console.log(data[0]);
  res.render("index", {
    showTitle: true,
    title: "Hovudside - Stavanger Snakk",
    Object: data[0]
  });
}

app.get("/", async function(req, res) {
  res.status = HttpStatus.OK;
  loadData(res);
});

app.post("/", async function(req, res) {
  let kords = req.body.koord.split(",");
  connect.setUserID(1);
  connect.setLatLng(kords[0], kords[1]);
  connect.setHistory(req.body.tekst);
  connect.querywrite(0);
  res.redirect("/");
});
app.listen(11000);
