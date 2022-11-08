const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
  // max: 100,
  // idleTimeoutMillis: 0,
  // connectionTimeoutMillis: 0,
  // allowExitOnIdle: true
});
// var client = pool.connect();
// .then(() => console.log('Database connected!', pool.port))
// .catch((err) => console.error(err));

// module.exports.client = pool;
module.exports.pool = pool;