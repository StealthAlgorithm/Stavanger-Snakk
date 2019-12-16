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

app.get("/", async function(req, res) {
  res.status = HttpStatus.OK;
  res.render("index", {
    noEscape: true,
    showTitle: true,
    title: "Hovudside - Stavanger Snakk"
  });
});

app.post("/", async function(req, res) {
  let kords = req.body.koord.split(",");
  connect.setUserID(1);
  connect.setLatLng(kords[0], kords[1]);
  connect.setHistory(req.body.tekst);
  connect.querywrite(0);
  res.redirect("/");
});
app.get("/api/snakk/", async function(req, res) {
  let data = await connect.queryread(0);
  res.send(data[0]);
});
app.listen(11000);
