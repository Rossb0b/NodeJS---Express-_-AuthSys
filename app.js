const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();

mongoose
    .set('useCreateIndex', true)
    .set('useUnifiedTopology', true)
    .connect("mongodb+srv://" + process.env.dbUserName + ":" + process.env.dbUserPassword + process.env.dbClusterUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to database');
    })
    .catch(() => {
        console.log('connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
