import express, { Request, Response } from 'express';

import path from 'path';
import cors from 'cors';
import { ServerError } from '../types';
import { loginRouter } from "./routes/loginRouter";
// import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// import passport from 'passport';
// import "./passport-config"; // Import the Passport configuration

// require .env files in
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// console.log('hi')
// route handlers
app.use('/login', () => {
  console.log('before loginRouter');
}, loginRouter);

// app.use('/login', (req, res, next) => {
//   console.log('before loginRouter');
//   next();
// }, loginRouter);

// //is this public? 
// app.use('/', express.static(path.join(__dirname, '../public')));

// If env is Production, serve our static bundle
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "dist")));
  app.get("/*", function (_req, res) {
    return res.sendFile(path.join(path.resolve(), "dist", "index.html"));
  });
}

// catch-all handler
app.use((_req: Request, res: Response) => {
  return res.status(404).send("Invalid endpoint");
});

// global handler
app.use((err: ServerError, _req: Request, res: Response) => {
  const defaultErr: ServerError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});