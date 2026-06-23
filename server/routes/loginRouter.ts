import express, { Request, Response } from 'express';
import { userController } from "../controllers/userController";
import { cookieController } from "../controllers/cookieController";

const loginRouter = express.Router();

/**
 * @route POST /signupRequest
 * @desc Registers a new user and sets a signed JWT cookie upon successful registration.
 * @access Public
 */
loginRouter.post(
  "/signupRequest",
  userController.createUser,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    if (res.locals.user_id) {
      console.log('User successfully registered');
      return res.status(200).send('You are logged in');
    } else {
      return res.status(500).json({ error: 'User ID not found' });
    }
  },
);

/**
 * @route GET /verify
 * @desc Verifies the JWT in the ssid cookie. Returns status true if valid, false if not.
 * @access Public
 */
loginRouter.get(
  "/verify",
  cookieController.verifySSIDCookie,
  (_req: Request, res: Response) => {
    return res.status(200).json({ status: true });
  },
);

/**
 * @route POST /loginRequest
 * @desc Authenticates user login credentials and sets a signed JWT cookie upon success.
 * @access Public
 */
loginRouter.post(
  "/loginRequest",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    if (res.locals.user_id) {
      return res.status(200).send('You are logged in');
    } else {
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }
);

export { loginRouter };