// import { Pool } from 'pg';
// import pg from 'pg';
// const { Pool } = 'pg';
import pg from 'pg';
const { Pool } = pg;

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


// export const query = (text: string, params: any[], callback: Function) => {
//   console.log('executed query', text);
//   return pool.query(text, params, callback);
//};
export { pool }; // Export the pool object separately



// import { Pool } from 'pg';
// // import dotenv from 'dotenv';

// const pool = new Pool({
//     connectionString: process.env.PG_URL
// })

// module.exports = {
//   query: (text, params, callback) => { 
//   console.log('executed query', text);
//   return pool.query(text, params, callback);
//   }
// };

// import { Pool, QueryConfig, QueryResult } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.PG_URL,
// });

// export const executeQuery = async (
//   text: string,
//   params?: any[],
//   callback?: (err: Error, result: QueryResult<any>) => void
// ): Promise<QueryResult<any>> => {
//   console.log('Executed query:', text);
//   const queryConfig: QueryConfig<any> = {
//     text,
//     values: params,
//   };

//   if (callback) {
//     pool.query(queryConfig, callback);
//     return Promise.resolve({} as QueryResult<any>);  // return an empty QueryResult as a resolved Promise
//   } else {
//     return pool.query(queryConfig);
//   }
// };




