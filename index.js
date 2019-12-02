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
  console.log(req.body.tekst + " " + req.body.koord);
  connect.setUserID(1);
  connect.setLatLng(req.body.koord);
  connect.setHistory(req.body.tekst);

  await connect.querywrite(0);
  res.redirect("/");
});
app.listen(3000);
