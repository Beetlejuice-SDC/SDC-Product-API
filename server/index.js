require("dotenv").config();
const express = require("express");
const client = require("../dbs/db.js")
//test for mongodb
// const mongodb = require("../dbs/mongo.js")
const model = require("./models/products.js")
const productRoutes = require('./routes/products.js');
// const sessionHandler = require("./middleware/session-handler");
// const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
// Serves up all static and generated assets in ../client/dist.
// app.use(express.static(path.join(__dirname, "../client/dist")));


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);