import { Pool } from 'pg';
// import dotenv from 'dotenv';

const pool = new Pool({
    connectionString: process.env.PG_URL
})

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};
