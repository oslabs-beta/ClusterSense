import { NextFunction, Request, Response } from "express";
// const User = require('../database/userDatabase');
import { pool } from "../database/userDatabase";
import bcrypt from 'bcryptjs';

/*
    CREATE TABLE "users" (
    user_id serial PRIMARY KEY,
    username varchar(50) NOT NULL,
    password varchar(255),
    oauth_provider varchar(255),
    oauth_id varchar(255),
    oauth_access_token varchar(255),
    oauth_refresh_token varchar(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
*/

const userController = {
    
    // Creating a new user
    createUser: async (
      req: Request, 
      res: Response, 
      next: NextFunction,
      ): Promise<void> => {

        const { username, password } = req.body;
        console.log(`${username}, ${password}`)

        // checking if input fields are empty
        // if (!username || !password) {
        //   return next({
        //     log: "Error in userController.createUser. Missing input fields",
        //     status: 400,
        //     message: { err: "All fields required" },
        //   });
        // }
      
        try {
          // Check if the username already exists
          // console.log('inside try')
          // const existingUserQuery = `SELECT * FROM "users" WHERE username = $1`;
          // console.log(`${existingUserQuery}`)
          // const existingUserValues = [req.body.username];
          // //console.log(JSON.stringify(`${existingUserQuery}`))
          // const existingUserResult = await pool.query(
          //    existingUserQuery,
          //    existingUserValues
          // );
          // console.log('inside try after query')
          // if (existingUserResult.rows.length > 0) {
          //   res.status(409).json({ error: 'Username already exists' });
          //   return next();
          // }

          // create user in database
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          console.log(`${salt}, ${hashedPassword}`)
          const insertQuery = `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING *`;
          const insertValues = [username, hashedPassword];
          const createUser = await pool.query(insertQuery, insertValues);
          //save the user's id to res.locals
          res.locals.userId = createUser.rows[0].user_id;
          console.log(`{res.locals.userId}`);
          return next();
        } catch (err) {
          console.error("Error in createUser:", err);
          return next({
            log: `Error occurred in createUser-create ${err}`,
            status: 500,
            message: { err: "Unable to create user" },
          });
        }
      },
}


export { userController };