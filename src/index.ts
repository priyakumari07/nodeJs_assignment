const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require('./database/database');

dotenv.config();

const app = express();

 // import routes
 const authRoutes = require("./routes/auth");

 // middlewares
app.use(express.json()); // for body parser

// route middlewares
app.use("/api/user", authRoutes);
app.listen(7000, () => console.log("server is running..."));
