import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

// Create a new connection pool using PG_URL environment variable.
const pool = new Pool({
  connectionString: process.env.PG_URL
});

/**
 * Execute a query against the database.
 * @param text - SQL query.
 * @param params - Query parameters.
 * @param callback - Handle results or errors.
 */
export const query = (
  text: string,
  params: Array<string | number | boolean>,
  callback: (error: Error, result: unknown) => void
) => pool.query(text, params, callback);

export { pool };
