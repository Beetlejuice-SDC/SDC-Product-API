require("dotenv").config();
const express = require("express");
const client = require("../dbs/db.js")
// const mongodb = require("../dbs/mongo.js")
const productModel = require("./models/products.js")
// const path = require("path");
// const sessionHandler = require("./middleware/session-handler");
// const logger = require("./middleware/logger");
// const model = require("./model.js")

// Establishes connection to the database on server start
// const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.

// Logs the time, session_id, method, and url of incoming requests.


app.use(express.json());
// Serves up all static and generated assets in ../client/dist.
// app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/', (req, res) => {
  productModel.product(2)
  .then((response) => {
    res.send(response['rows'])
    console.log('your get products request succeed')
  }).catch((err) => {
    console.log(err);
  })
});

app.get('/feature', (req, res) => {
  console.log('sss',req.query.product_id)
  productModel.feature(req.query.product_id)

  .then((response) => {
    res.send(response['rows'][0])
    console.log('get succeed');
  }).catch((err) => {
    console.log(err);
    res.end(err);
  })
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);