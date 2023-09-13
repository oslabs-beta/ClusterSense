import express from "express";
import { Request, Response } from 'express';
import { clusterController } from "../controllers/clusterController";
// import { sessionController } from "../controllers/sessionController";
// import { cookieController } from "../controllers/cookieController";
const clusterRouter = express.Router();

clusterRouter.post("/", clusterController.storeCluster, //needs logic for data to stream to grafana here and attaching it to response
  (_req: Request, res: Response) => {
    return res.status(200).send();
  },
);

clusterRouter.get("/DB", clusterController.fetchCluster,
  (_req: Request, res: Response) => {
    const { clusters } = res.locals;
    // [ { cluster_port: 1010 }, { cluster_port: 2020 } ]
    // [ { value: 1010, label: 1010 }, { value: 2020, label: 2020 } ]
    return res.status(200).json([...clusters]);
  },
);
export { clusterRouter };