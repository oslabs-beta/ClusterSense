import express from "express";
import { Request, Response } from 'express';
import { userController } from "../controllers/userController";
import { cookieController } from "../controllers/cookieController";
const loginRouter = express.Router();

// sign up request
loginRouter.post(
  "/signupRequest",
  userController.createUser,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    if (res.locals.user_id) {
      console.log('in router')
      return res.status(200).send('you are logged in');
    } else {
      return res.status(500).json({ error: 'User ID not found' });
    }
  },
);

loginRouter.get(
  "/verify",
  (_req: Request, res: Response) => {
    let loggedIn=false
    if (_req.cookies.ssid){
      loggedIn=true
    }
   return res.status(200).json({ status: loggedIn }).send();
 },
);

// login request
loginRouter.post(
  "/loginRequest",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
 return res.status(200).send("You are logged in");
  },
);


export { loginRouter };