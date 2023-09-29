import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

// Establish a new database connection using PG_URL from environment variables
const pool = new Pool({
  connectionString: process.env.PG_URL
});

/**
 * Execute a database query.
 * @param text - SQL query string.
 * @param params - Query parameters.
 * @param callback - Function to handle the result or error.
 */
export const query = (
  text: string,
  params: Array<string | number | boolean>,
  callback: (error: Error, result: unknown) => void
) => pool.query(text, params, callback);

export { pool };
