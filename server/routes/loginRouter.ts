import express from "express";
import { Request, Response } from 'express';
import { userController } from "../controllers/userController";
import { sessionController } from "../controllers/sessionController";
//import { cookieController } from "../controllers/cookieController";
const loginRouter = express.Router();

// sign up request
loginRouter.post(
  "/signupRequest",
  userController.createUser,
  (_req: Request, res: Response) => {
    if (res.locals.userId) {
      return res.status(201).json({ userId: res.locals.userId });
    } else {
      return res.status(500).json({ error: 'User ID not found' });
    }
  },
);

// login request
loginRouter.post(
  "/loginRequest",
  userController.verifyUser,
  //sessionController.startSession,
  //cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    return res.status(200).send("You are logged in");
  },
);

// authorizing user who has already logged in
loginRouter.get(
  "/isLoggedIn",
  sessionController.isLoggedIn,
  (_req: Request, res: Response) => {
    return res.status(201).json({ message: "login successful" });
  }
);

export { loginRouter };