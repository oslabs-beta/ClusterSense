import { NextFunction, Request, Response } from "express";
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
*/

const userController = {

  // Creating a new user
  createUser: async (
    req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;
    // checking if input fields are empty
    if (!username || !password) {
      return next({
        log: "Error in userController.createUser. Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }

    try {
      // Check if the username already exists
      const existingUserQuery = `SELECT * FROM "users" WHERE username = $1`;
      const existingUserValues = [req.body.username];
      const existingUserResult = await pool.query(
        existingUserQuery,
        existingUserValues
      );
      if (existingUserResult.rows.length > 0) {
        res.status(409).json({ error: 'Username already exists' });
        return next()
      }

      // create user in database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insertQuery = `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING *`;
      const insertValues = [username, hashedPassword];
      const createUser = await pool.query(insertQuery, insertValues);
      //save the user's id to res.locals
      res.locals.user_id = createUser.rows[0].user_id;
      return next();
    } catch (err) {
      return next({
        log: `Error occurred in createUser-create ${err}`,
        status: 500,
        message: { err: "Unable to create user" },
      });
    }
  },

  // verify user
  verifyUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    // Check for missing input fields
    if (!username || !password) {
      return next({
        log: "Error in userController.verifyUser. Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }

    try {
      // Check if the username exists
      const existingUsernameQuery = `SELECT * FROM "users" WHERE username = $1`;
      const userResult = await pool.query(existingUsernameQuery, [req.body.username]);

      // If no user found by that username
      if (userResult.rows.length === 0) {
        res.status(409).json({ error: 'Invalid Username or Password' });
      }

      // check if password is correct
      const user = userResult.rows[0];
      console.log(user);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(401).json({ error: 'Invalid Username or Password' });
      }
      res.locals.user_id = user.user_id;
      return next()
    } catch (err) {
      return next({
        log: `Error occurred in userController.verifyUser ${err}`,
        status: 500,
        message: { err: "Unable to verify user" },
      });
    }
  },
}

export { userController };