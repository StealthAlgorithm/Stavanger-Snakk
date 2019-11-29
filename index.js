"use strict";
const Connect = require("./query.inc");
const HttpStatus = require("http-status");

const express = require("express");
const exphbs = require("express-handlebars");
const connect = new Connect();
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

async function loadData(res) {
  let data = await connect.query(0);
  res.render("index", {
    showTitle: true,
    title: "Main Site - Stavanger Snakk",
    Object: data[0]
  });
}

app.get("/", async function(req, res) {
  res.status = HttpStatus.OK;
  loadData(res);
});

app.listen(3000);
