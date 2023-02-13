const { Pool } = require('pg');

// Postgres connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

// Postgres connection client
var client = pool.connect()
  .then(() => console.log('Database connected on port', pool.port))
  .catch((err) => console.error(err));

module.exports.client = client;
module.exports.pool = pool;