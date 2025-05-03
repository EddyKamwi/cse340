const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => res.json("Home Page"));

app.listen(process.env.PORT,()=>{console.log(`server Started at http://localhost:${process.env.PORT}`)});
