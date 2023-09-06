import { NextFunction, Request, Response } from "express";
import  from "../models/userModel";
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
    createUser: async (req: Request, res: Response, next: NextFunction,
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
        // Verifying if an account exists
        try {
          const existingUserQuery = `SELECT * FROM "user" WHERE username = $1`;
          const existingUserValues = [req.body.username];
          // Check if the username already exists
          const existingUserResult = await User.query(
             existingUserQuery,
             existingUserValues
          );
          if (existingUserResult.rows.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const insertQuery = `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`;
          const insertValues = [username, hashedPassword];
          const createUser = await User.query(insertQuery, insertValues);
          //save the user's id to res.locals
          res.locals.userId = createUser.rows[0].user_id;
          return next();
        } catch (err) {
          return next({
            log: `Error occurred in createUser-create ${err}`,
            status: 500,
            message: { err: "Unable to create user" },
          });
        }
      },
}




export { userController };