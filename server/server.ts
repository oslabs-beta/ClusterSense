import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ServerError } from '../types';
import { loginRouter } from "./routes/loginRouter";
import { clusterRouter } from "./routes/clusterRouter";

import http from 'http';
import {WebSocketServer, WebSocket} from 'ws';


dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());          
app.use(cors({
  origin: process.env.CORS_ORIGIN ||'http://localhost:3030',
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

app.use((err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr: ServerError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const server = http.createServer(app);

const wss = new WebSocketServer ({ server });

const PROMETHEUS_BASE = process.env.PROMETHEUS_URL || 'http://localhost:9090';
const POLL_INTERVAL_MS = 5000; //metrics every 5 seconds

wss.on('connection', (ws: WebSocket) =>{
  console.log ('Websocket client connected');

  let intervalId: ReturnType<typeof setInterval> | null = null;

  ws.on('message', raw =>{
    const {port} = JSON.parse(raw.toString()) as {port: number};
    //clears any existing interval if client sends a new port number
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(async () =>{
      if (ws.readyState !== WebSocket.OPEN) return;

      try {
        const url = `${PROMETHEUS_BASE}/api/v1/query_range?query=kafka_server_brokertopicmetrics_messagesin_total{instance="jmx-exporter:5556"}&start=${Math.floor(Date.now() / 1000) - 150}&end=${Math.floor(Date.now() / 1000)}&step=30`;
        const response = await fetch(url);
        const data = await response.json();

        ws.send(JSON.stringify ({port, metrics: data.data?.result ?? []}));
      }catch (err){
        console.error(`Prometheus fetch error for port ${port}`, err);
        ws.send(JSON.stringify({port, metrics:[], error: 'Prometheus unreachable'}))
      }
    }, POLL_INTERVAL_MS);
  });
  ws.on('close',() =>{
    console.log('WebSocket client disconnected');
    if(intervalId) clearInterval(intervalId);
  })
})

server.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});
