import express from "express";
import { Request, Response } from 'express';
import { userController } from "../controllers/userController";
const loginRouter = express.Router();

// login request
// loginRouter.post(
//     "/loginRequest",
//     userController.verifyUser,
//     (_req: Request, res: Response) => {
//       return res.status(200).send("You are logged in");
//     },
// );
//    sessionController.startSession,
//    cookieController.setSSIDCookie

// authorizing user who has already logged in
// loginRouter.get(
//   "/isLoggedIn",
//   (_req: Request, res: Response) => {
//       console.log('get Request');
//       return res.status(201).json({ message: "login successful" });
//   }
// );

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


export { loginRouter };