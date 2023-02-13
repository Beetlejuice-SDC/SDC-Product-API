require("dotenv").config();
const express = require("express");
const client = require("../dbs/postgres/db.js")
const productRoutes = require('./routes/products.js');

/** Optinal middlewares */
// const sessionHandler = require("./middleware/session-handler");
// const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use(express.static("public"));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);