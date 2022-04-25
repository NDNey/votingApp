const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const { auth } = require("express-openid-connect");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

const { httpServer, app } = require("./middleware/socket");

const { config } = require("./config/auth");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
connectDB();

//AUTH0

app.use(auth(config));

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.PORT,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", mainRoutes);

httpServer.listen(process.env.PORT);
