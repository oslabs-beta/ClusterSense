import express from "express";
import { Request, Response } from 'express';
import { userController } from "../controllers/userController";
import { cookieController } from "../controllers/cookieController";

const loginRouter = express.Router();

/**
 * @route POST /signupRequest
 * @desc Registers a new user and sets an SSID cookie upon successful registration.
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
 * @desc Verifies if the user is logged in based on the presence of the SSID cookie.
 * @access Public
 */
loginRouter.get(
  "/verify",
  (_req: Request, res: Response) => {
    const loggedIn = _req.cookies.ssid ? true : false;
    return res.status(200).json({ status: loggedIn });
  },
);

/**
 * @route POST /loginRequest
 * @desc Authenticates user login credentials and sets an SSID cookie upon successful authentication.
 * @access Public
 */
loginRouter.post(
  "/loginRequest",
  userController.verifyUser,              
  cookieController.setSSIDCookie,          
  (_req: Request, res: Response) => {
    return res.status(200).send("You are logged in");
  },
);

export { loginRouter };
