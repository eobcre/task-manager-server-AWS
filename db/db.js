const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSCODE,
//   port: process.env.POSTGRES_PORT,
// });

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
