import express, { Request, Response } from "express";
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


//Sign up request
loginRouter.post(
    "/signupRequest",
    userController.createUser,
    (_req: Request, res: Response) => {
      return res.status(201).json({ userId: res.locals.userId });
    },
);

export { loginRouter };