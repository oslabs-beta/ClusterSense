import express from "express";
import { Request, Response } from 'express';
import { userController } from "../controllers/userController";
const loginRouter = express.Router();

// loginRouter to handle login request
// loginRouter.post(
//     "/loginRequest",
//     userController.verifyUser,
//     (_req: Request, res: Response) => {
//       return res.status(200).send("You are logged in");
//     },
// );
//    sessionController.startSession,
//    cookieController.setSSIDCookie,
loginRouter.get(
  "/",() => {
    console.log('in loginRouter');
  },
  (_req: Request, res: Response) => {
      console.log('get Request for /');
      return res.status(201).json({ message: "Regular Login/ get request works!" });
  }
);


// loginRouter.get(
//   "/signupRequest",
//   (_req: Request, res: Response) => {
//       console.log('get Request');
//       return res.status(201).json({ message: "Sign up successful" });
//   }
// );

//Sign up request
loginRouter.post(
    "/signupRequest",
    userController.createUser,
    (_req: Request, res: Response) => {
      console.log('post Request')
      return res.status(201)//.json({ userId: res.locals.userId });
    },
);
//    userController.createUser,
export { loginRouter };