/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const router = require("./routes/app");
const elayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController").baseController;

/* ***********************
 * Routes
 *************************/
app.use(express.json());

// templating setup
app.use(elayouts);
app.set("view engine", "ejs");

app.use(static);
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
