import { NextFunction, Request, Response } from "express";
import { pool } from "../database/userDatabase";
import bcrypt from 'bcryptjs';

const userController = {
  
  /**
   * createUser - Handle user registration.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @returns Promise<void>
  */

  createUser: async (
    req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next({
        log: "Error in userController.createUser: Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }

    try {
      const existingUserResult = await pool.query(
        `SELECT * FROM "users" WHERE username = $1`,
        [username]
      );

      // If user exists, send an error response
      if (existingUserResult.rows.length > 0) {
        res.status(409).json({ error: 'Username already exists' });
        return next();
      }

      // Encrypt user password and insert the new user into the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const { rows:[newUser] } = await pool.query(
        `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING user_id`,
        [username, hashedPassword]
      );

      // Store the user's id in res.locals for subsequent middleware
      res.locals.user_id = newUser.user_id;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.createUser: ${err}`,
        status: 500,
        message: { err: "Unable to create user" },
      });
    }
  },

  /**
   * verifyUser - Handle user authentication.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @returns Promise<void>
   */
  verifyUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    // Validate input fields
    if (!username || !password) {
      return next({
        log: "Error in userController.verifyUser: Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }

    try {
      // Query to retrieve the user based on the provided username
      const existingUsernameQuery = `SELECT * FROM "users" WHERE username = $1`;
      const userResult = await pool.query(existingUsernameQuery, [username]);

      // If no match is found for the username
      if (userResult.rows.length === 0) {
        res.status(409).json({ error: 'Invalid Username or Password' });
      }

      // Validate the provided password against the stored hash
      const user = userResult.rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(401).json({ error: 'Invalid Username or Password' });
      }

      // Store the user's id in res.locals for subsequent middleware
      res.locals.user_id = user.user_id;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.verifyUser: ${err}`,
        status: 500,
        message: { err: "Unable to verify user" },
      });
    }
  },
}

export { userController };
