import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URL
});

export const query = (
  text: string,
  params: Array<string | number | boolean>,
  callback: (error: Error, result: unknown) => void
) => {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};

export { pool }; // Export the pool object separately
