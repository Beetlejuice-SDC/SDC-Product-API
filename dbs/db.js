const { Client } = require('pg');
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
client.connect()
.then(() => console.log('Database connected!', client.port))
.catch((err) => console.error(err));

module.exports.client = client;