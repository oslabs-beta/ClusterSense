import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ServerError } from '../types';
import { loginRouter } from "./routes/loginRouter";
import { clusterRouter } from "./routes/clusterRouter";


dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());          
app.use(cors({
  origin: 'http://localhost:3030',
  credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

// Route handlers
app.use('/login', loginRouter);                         
app.use('/cluster', clusterRouter);                   
app.get('/logout', (_req: Request, res: Response) => {  
  return res.cookie('ssid', '', {
    expires: new Date(0),
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }).status(200).send('session ended');
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "dist"))); 
  app.get("/*", function (_req, res) {                         
    return res.sendFile(path.join(path.resolve(), "dist", "index.html"));
  });
}

app.use((_req: Request, res: Response) => {
  return res.status(404).send("Invalid endpoint");
});

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
