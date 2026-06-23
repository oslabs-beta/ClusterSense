import { NextFunction, Request, Response } from "express";
import { pool } from "../database/userDatabase";
import bcrypt from 'bcryptjs';

// Password must be 8+ chars, with at least one uppercase, lowercase, and number
const validatePassword = (password: string): string | null => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('one number');
  if (errors.length === 0) return null; // null means valid
  return 'Password must have an uppercase, lowercase, and number.';
};

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

    // Validate password before touching the database
    const passwordError = validatePassword(password);
    if (passwordError) {
      res.status(400).json({ error: passwordError });
      return;
    }

    try {
      const existingUserResult = await pool.query(
        `SELECT * FROM "users" WHERE username = $1`,
        [username]
      );

      if (existingUserResult.rows.length > 0) {
        res.status(409).json({ error: 'Username already exists' });
        return next();
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { rows: [newUser] } = await pool.query(
        `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING user_id`,
        [username, hashedPassword]
      );

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

    if (!username || !password) {
      return next({
        log: "Error in userController.verifyUser: Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }

    try {
      const { rows: [user] } = await pool.query(
        `SELECT user_id, password FROM "users" WHERE username = $1`,
        [username]
      );

      if (!user) {
        res.status(401).json({ error: 'Invalid Username or Password' });
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(401).json({ error: 'Invalid Username or Password' });
        return;
      }

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
};

export { userController };