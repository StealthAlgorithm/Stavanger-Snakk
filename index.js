"use strict";

const Connect = require("./query.inc");

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
static_pages.use(serve(__dirname + "/stavangersnakk/build"));
app.use(mount("/", static_pages));
app.use(mount("/newhistory", static_pages));
app.use(mount("/new", static_pages));
app.use(mount("/404", static_pages));
//___________________________________________________________

app.use(BodyParser());
app.use(Logger());
app.use(cors());

router
  .post("/historydata", async (ctx, next) => {
    console.log("refreshed");
    let data = await connect.query(0);
    ctx.status = HttpStatus.OK;
    ctx.body = data[0];
    await next();
  })
  .post("/historypostdata", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    let test = ctx.request.body;
    console.log(test);
    await next();
  });

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
  console.log("lytter på post 11000");
});
