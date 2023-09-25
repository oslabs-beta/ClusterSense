import { NextFunction, Request, Response } from "express";
import { pool } from "../database/userDatabase";
// import { OAuthUser } from "../../types";

/*
    CREATE TABLE sessions (
        id SERIAL PRIMARY KEY,
        cookieId VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
*/

const sessionController = {
  // startSession - create and save a new Session into the database.
  startSession: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {

    const { user_id } = res.locals;
    console.log(`a new session created for user ${user_id}`)
    // check if session already exists for user
    try {
      // check if session already exists for user
      const existingSessionQuery = `SELECT * FROM sessions WHERE cookieId = $1`;
      const sessionResult = await pool.query(existingSessionQuery, [user_id]);
      if (sessionResult.rows.length > 0) {
        // Session already exists, move on.
        console.log('session exists')
        return next();
      } else {
        // No session exists, create one.
        const createSessionQuery = `INSERT INTO sessions (cookieId) VALUES ($1)`;
        await pool.query(createSessionQuery, [user_id]);
        console.log('session created')
        return next();

      }
    } catch (err) {
      return next({
        log: `Error occurred in sessionController.startSession ${err}`,
        status: 500,
        message: { err: "Unable to create session" },
      });
    }
  },

  // isLoggedIn - find the appropriate session for this request in the DB and verify whether or not the session is still valid
  isLoggedIn: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { ssid } = req.cookies;

    try {
      // Use the pg pool to query the sessions table and find a session with the matching cookieId
      const result = await pool.query('SELECT * FROM sessions WHERE cookieId = $1', [ssid]);

      // If session is not found, send a status code 303 to the front-end
      if (result.rows.length === 0) {
        res.status(303).json("No active session exists");
      } else {
        // If the session is found, save the cookie ssid in res.locals and return next()
        res.locals.userId = ssid;
        return next();
      }
    } catch (err) {
      return next({
        log: `Error occurred in sessionController.isLoggedIn ${err}`,
        status: 500,
        message: { err: "Unable to find session" },
      });
    }
  },

  
  // old session verification 
// loginRouter.get(
//   "/isLoggedIn",
//   sessionController.isLoggedIn,
//   (_req: Request, res: Response) => {
//     return res.status(201).json({ message: "login successful" });
//   }
// );






};
export { sessionController };