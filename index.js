"use strict";

const Connect = require("./query.inc");

//viktig en installerer alle pakkene
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const cors = require("koa2-cors");
const serve = require("koa-static");
const mount = require("koa-mount");
const HttpStatus = require("http-status");

const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const static_pages = new Koa();
const connect = new Connect();
//_______________mounting front end__________________________
static_pages.use(serve(__dirname + "/frontend/build"));
app.use(mount("/", static_pages));
app.use(mount("/newhistory", static_pages));
app.use(mount("/new", static_pages));
app.use(mount("/404", static_pages));
//___________________________________________________________

app.use(BodyParser());
app.use(Logger());
app.use(cors());

// -------------------sende og mota data---------------------
router
  //sender data i form av json
  .post("/historydata", async (ctx, next) => {
    console.log("lastet side, begynner å hente historie data");
    //henter data fra database med spørre streng 0
    let data = await connect.query(0);
    ctx.status = HttpStatus.OK;
    //legger ut json dataen
    ctx.body = data[0];
    console.log(data[0]);
    await next();
  })
  //motar data i form av json
  .post("/historypostdata", async (ctx, next) => {
    console.log("lastet side, begynner å motta Historie data");
    ctx.status = HttpStatus.OK;
    //henter json data
    let test = ctx.request.body;
    //console.log(test);
    await next();
  });
//-------------------------------------------------------------

//feil hontrering
app.use(async (ctx, next) => {
  try {
    await next();

    if (ctx.status === 404) ctx.redirect("/404");
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = "Error";
  }
});

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(11000, () => {
  console.log("lytter på port 11000, http://localhost:11000");
});
