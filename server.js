/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const static = require("./routes/static");
const router = require("./routes/index");
const elayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController").baseController;
const session = require("express-session");
const pool = require("./database/");
const utilities = require("./utilities/");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* ***********************
 * Routes
 *************************/
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(utilities.checkJWTToken);

app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// templating setup
app.use(elayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/main");

app.use(static);
app.use("/account", require("./routes/accountRoute"));
app.use("/inv", require("./routes/inventoryRoute"));
app.use("/", router);

/* ***********************
 * Local Server Information

 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 *route error handling
 *************************/
app.use((req, res, next) => {
  baseController.buildError(req, res, next);
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on http://${host}:${port}`);
});
